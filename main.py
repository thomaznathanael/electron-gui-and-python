import eel
import sqlite3
eel.init('web')

conn = sqlite3.connect('data.db')
cursor = conn.cursor()

@eel.expose
def auto_complete_back():
    lista_linha = []
    cursor.execute(f"""
    SELECT nome_produto FROM estoque
    """)
    for linha in cursor.fetchall():
        lista_linha.append(linha[0])
    print(lista_linha)
    eel.r_countries(lista_linha)

@eel.expose
def consulta_t_real_nome(nome):
    try:
        if(nome.isnumeric()):
            cursor.execute(f"""
            SELECT * FROM estoque WHERE codigo_produto = {nome}
            """)
        else:
            cursor.execute(f"""
            SELECT * FROM estoque WHERE nome_produto = '{nome}'
            """)

        for linha in cursor.fetchall():
            titulo = str(linha[2])
            codigo = linha[1]
        eel.atualiza_titulo(codigo, titulo)

    except:
        if(nome != ''):
            eel.atualiza_titulo(0,'Produto não encontrado')
        else:
            eel.atualiza_titulo(0,'SISTEMA PDV')



@eel.expose
def add_pdv(cod):
    print(cod)
    if(str(cod).isnumeric()):
        cursor.execute(f"""
        SELECT * FROM estoque WHERE codigo_produto = {cod}
        """)
    else:
        cursor.execute(f"""
        SELECT * FROM estoque WHERE nome_produto = '{cod}'
        """)

    for linha in cursor.fetchall():
        eel.appendText_pdv(linha[0], linha[1], str(linha[2]), linha[3], linha[4], linha[5], linha[6], linha[7])
    eel.beep()


@eel.expose
def mostrar(ordem_atual, seta):
    cursor.execute(f"""
    SELECT * FROM estoque ORDER BY {ordem_atual} {seta}
    """)
    eel.reset_prod()
    for linha in cursor.fetchall():
        eel.appendText(linha[0], linha[1], str(linha[2]), linha[3], linha[4], linha[5], linha[6], linha[7])



@eel.expose
def pega_val(cod):
    cursor.execute(f"""
    SELECT * FROM estoque WHERE codigo_produto = {cod}
    """)
    for linha in cursor.fetchall():
        lista_linha = list(linha)
        eel.add_editar(lista_linha)


@eel.expose
def salvar_produto(codigo_prod, nome_prod, preco_vend, preco_cust, estoq):
    lucr = float(preco_vend) - float(preco_cust)
    lucro_perc = round(lucr / float(preco_vend) * 100, 2)
    nome_prod = nome_prod

    lista = (int(codigo_prod), nome_prod, round(float(preco_vend), 2), round(float(preco_cust), 2), round(lucr, 2), round(lucro_perc, 2), int(estoq))
    print(lista)
    cursor.execute(f"""
    INSERT INTO estoque (codigo_produto, nome_produto, preco_venda, preco_custo, lucro, lucro_percent, estoque)
    VALUES (?,?,?,?,?,?,?)
    """, lista)

    conn.commit()


@eel.expose
def salvar_editado(idt, codigo_prod, nome_prod, preco_vend, preco_cust, estoq):
    lucr = float(preco_vend) - float(preco_cust)
    lucro_perc = round(lucr / float(preco_vend) * 100, 2)

    lista = (int(codigo_prod), nome_prod, round(float(preco_vend), 2), round(float(preco_cust), 2), round(lucr, 2), round(lucro_perc, 2), int(estoq))
    print(lista)
    cursor.execute(f"""
    UPDATE estoque SET codigo_produto = ?, nome_produto = ?, preco_venda = ?, preco_custo = ?, lucro = ?, lucro_percent = ?, estoque = ?
    WHERE id = {int(idt)}
    """, lista)

    conn.commit()


@eel.expose
def remover_produto(rem_cod):
    cursor.execute(f"""
    DELETE FROM estoque WHERE id = {rem_cod}
    """)
    conn.commit()




eel.start('index.html', mode='custom', cmdline_args=['node_modules/electron/dist/electron.exe', '.'])
