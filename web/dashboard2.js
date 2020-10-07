var height = screen.height;
var min_width_tabela;
if (height <= 720) {
    document.body.style.zoom = 0.65;
    min_width_tabela = '112px';
} else if (720 < height && height <= 800) {
    document.body.style.zoom = 0.7;
    min_width_tabela = '113px';
} else if (800 < height && height < 1024) {
    min_width_tabela = '117px';
    document.body.style.zoom = 0.8
} else {
    document.body.style.zoom = 1;
    min_width_tabela = '122px';
}



function salvar_prod() {
    var cod = $("#input_cod_prod").val();
    var nome = $("#input_nome_prod").val();
    var estoq = $("#input_estoque").val();
    var preco_v = $('#input_preco_venda').val().replace('.', '').replace(',', '.');
    var preco_c = $('#input_preco_compra').val().replace('.', '').replace(',', '.');
    eel.salvar_produto(cod, nome, preco_v, preco_c, estoq)
    $('#myForm input').val("");
    eel.mostrar(troca_ordem, ordenacao)
}





$('#pdv').tab('show')
$("#campo1").focus();

function EnterTab(InputId) {
    if (event.keyCode == 13) {
        document.getElementById(InputId).focus()
        if (InputId == 'campo2') { document.getElementById(InputId).select() }
        var cons_val = $("#campo1").val()
        eel.consulta_t_real_nome(cons_val)
    }

}

eel.expose(atualiza_titulo);
function atualiza_titulo(cod, titulo) {

    if (titulo == 'Produto não encontrado' || titulo == 'SISTEMA PDV') {

        document.getElementById('campo1').focus()
        document.getElementById('campo1').select()
    } else {
        titulo = cod + ' ● ' + titulo
    }
    $('#titulo_prod').text(titulo)
}

$(document).ready(function () {
    $("#campo1").submit(function (e) {
        e.preventDefault();//evito o submit do form ao apetar o enter..
    });
    //Quando o valor do campo mudar...
    $('.calc').keyup(function () {
        var preco_v = parseFloat($('#input_preco_venda').val().replace(".", "").replace(",", ".")) || 0.00;
        var preco_c = parseFloat($('#input_preco_compra').val().replace(".", "").replace(",", ".")) || 0.00;

        //O total
        var lucro = preco_v - preco_c;
        var lucro_percent = lucro / preco_v * 100;

        $('#input_lucro').val(number_format(lucro, 2, ',', '.'));
        $('#input_lucro_percent').val(number_format(lucro_percent, 0, ',', '.'));


        var preco_v_e = parseFloat($('#input_preco_venda_e').val().replace(".", "").replace(",", ".")) || 0.00;
        var preco_c_e = parseFloat($('#input_preco_compra_e').val().replace(".", "").replace(",", ".")) || 0.00;

        //O total
        var lucro_e = preco_v_e - preco_c_e;
        var lucro_percent_e = lucro_e / preco_v_e * 100;

        $('#input_lucro_e').val(number_format(lucro_e, 2, ',', '.'));
        $('#input_lucro_percent_e').val(number_format(lucro_percent_e, 0, ',', '.'));

    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

    $('#desconto').keyup(function () {
        var val_deconto = parseFloat($('#desconto').val().replace(".", "").replace(",", ".")) || 0.00;
        total = total_sd - val_deconto
        $('#total').text(number_format(total, 2, ',', '.'));
    });


});

$("form").submit(function (e) {
    e.preventDefault();
});

function number_format(number, decimals, dec_point, thousands_sep) {
    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d = dec_point == undefined ? "," : dec_point;
    var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}


$('#input_preco_venda').mask('#.##0,00', { reverse: true }, { 'translation': { 0: { pattern: /[0-9]/ } } });
$('#desconto').mask('#.##0,00', { reverse: true }, { 'translation': { 0: { pattern: /[0-9]/ } } });
$('#input_preco_compra').mask('#.##0,00', { reverse: true }, { 'translation': { 0: { pattern: /[0-9]/ } } });

$('#input_preco_venda_e').mask('#.##0,00', { reverse: true }, { 'translation': { 0: { pattern: /[0-9]/ } } });
$('#input_preco_compra_e').mask('#.##0,00', { reverse: true }, { 'translation': { 0: { pattern: /[0-9]/ } } });

eel.expose(reset_prod);
function reset_prod() {
    $("tr").remove('#tab');
}

eel.expose(appendText);
function appendText(ler_id, ler_cod, ler_nome, ler_prec_v, ler_prec_c, ler_lucro, ler_lucro_perc, ler_estoque) {
    var txt1 = `<tr id="tab"><th scope="row">` + ler_cod + `</th><td>` + ler_nome + `</td><td style='color:#00ccff'>R$ ` + number_format(ler_prec_v, 2, ",", ".") + `</td><td style='color:#ffcc00'>R$ ` + number_format(ler_prec_c, 2, ",", ".") + `</td><td style='color:#00cc00'>R$ ` + number_format(ler_lucro, 2, ",", ".") + `</td><td>` + number_format(ler_lucro_perc, 0, ",", ".") + `%</td><td>` + ler_estoque + `</td><td><a data-toggle="modal" data-target="#exampleModa" style="position:relative; left:80px;" href="#" class="btn btn-outline-light btn-sm" onclick="eel.pega_val(` + ler_cod + `)" role="button" aria-pressed="true">Editar</a><a data-toggle="modal" data-target="#exampleModa1" style="position:relative; left:100px;" href="#" class="btn btn-outline-danger btn-sm" onclick="remover(` + ler_id + `,'` + ler_nome + `')" role="button" aria-pressed="true">Remover</a></td></tr>`;
    $("#tabela").append(txt1);
}

function js_add_pdv() {
    var val_campo = $('#campo1').val()
    eel.add_pdv(val_campo)
}

var itens = 0;
var total_sd = 0;
var total = 0;
var contador_pdv = 0;
var myVar;

eel.expose(appendText_pdv);
function appendText_pdv(ler_id, ler_cod, ler_nome, ler_prec_v, ler_prec_c, ler_lucro, ler_lucro_perc, ler_estoque) {
    contador_pdv += 1;
    var txt1 = `<tr id="tab_pdv"><th scope="row" style='min-width:60px'>` + contador_pdv + `</th><td scope="row" style='min-width:180px'>` + ler_cod + `</td><td style='width:100%'>` + ler_nome + `</td><td style='min-width:80px'>` + $("#campo2").val() + `</td><td style='min-width:140px'>R$ ` + number_format(ler_prec_v, 2, ",", ".") + `</td><td style='min-width:` + min_width_tabela + `'>R$ ` + number_format(ler_prec_v * parseInt($("#campo2").val()), 2, ",", ".") + `</td></tr>`;
    $("#tabela_pdv").append(txt1);

    itens += parseInt($("#campo2").val())
    var t_item;
    if (itens == 1) {
        t_item = ' item'
    } else {
        t_item = ' itens'
    }
    total_sd += ler_prec_v * parseInt($("#campo2").val())

    var val_deconto = parseFloat($('#desconto').val().replace(".", "").replace(",", ".")) || 0.00;
    total = total_sd - val_deconto
    $('#total').text(number_format(total, 2, ',', '.'));


    $("#itens").text(itens + t_item)
    $("#campo1").val('');
    $("#campo2").val('1');
    $("#campo1").focus();
    var elmnt = document.getElementById("tabela_pdv");
    elmnt.scrollIntoView(false);


    clearTimeout(myVar);
    myVar = setTimeout(function () {
        $('#titulo_prod').text('SISTEMA PDV')
    }, 2000);

}

eel.expose(beep)
function beep() {
    var audio1 = new Audio();
    audio1.src = "beep.mp3";
    audio1.play();
}



var ordenacao = 'ASC'
var troca_ordem = 'nome_produto'

eel.mostrar(troca_ordem, ordenacao)


function sel_ordem(ordem) {

    var estado_seta = $("#" + ordem).text()
    var ultimo = estado_seta.substr(-1, 1)

    $("#codigo_produto").text('Código');
    $("#nome_produto").text('Nome');
    $("#preco_venda").text('Preço');
    $("#preco_custo").text('Custo');
    $("#lucro").text('Lucro');
    $("#lucro_percent").text('Lucro(%)');
    $("#estoque").text('Qtd');

    switch (ultimo) {
        case '▾':

            $("#" + ordem).text($("#" + ordem).text() + ' ▴');
            ordenacao = 'DESC'
            troca_ordem = ordem
            eel.mostrar(troca_ordem, ordenacao)
            break;

        case '▴':

            $("#" + ordem).text($("#" + ordem).text() + ' ▾');
            ordenacao = 'ASC'
            troca_ordem = ordem
            eel.mostrar(troca_ordem, ordenacao)
            break;

        default:
            if (ordenacao == 'ASC') {
                $("#" + ordem).text($("#" + ordem).text() + ' ▾');
            } else if (ordenacao == 'DESC') {
                $("#" + ordem).text($("#" + ordem).text() + ' ▴');
            }
            troca_ordem = ordem
            eel.mostrar(troca_ordem, ordenacao)
            break;
    }
}


function remover(id, nome_prod) {
    $("#gamb_remov").val(id);
    $("#txt_remov").text('Deseja remover ' + nome_prod + '?');
}

function excluir() {
    var id = $("#gamb_remov").val();
    eel.remover_produto(id)
    eel.mostrar(troca_ordem, ordenacao)
}


eel.expose(add_editar);
function add_editar(lista_bd) {
    console.log(lista_bd);
    $("#gamb_edit").val(lista_bd[0]);
    $("#input_cod_prod_e").val(lista_bd[1]);
    $("#input_nome_prod_e").val(lista_bd[2]);
    $("#input_preco_venda_e").val(number_format(lista_bd[3], 2, ',', '.'));
    $("#input_preco_compra_e").val(number_format(lista_bd[4], 2, ',', '.'));
    $("#input_lucro_e").val(number_format(lista_bd[5], 2, ',', '.'));
    $("#input_lucro_percent_e").val(number_format(lista_bd[6], 0, ',', '.'));
    $("#input_estoque_e").val(lista_bd[7])
}

$('.alert').alert()
function salvar_edit() {
    var id_edit = $("#gamb_edit").val();
    var cod = $("#input_cod_prod_e").val();
    var nome = $("#input_nome_prod_e").val();
    var estoq = $("#input_estoque_e").val();
    var preco_v = $('#input_preco_venda_e').val().replace('.', '').replace(',', '.');
    var preco_c = $('#input_preco_compra_e').val().replace('.', '').replace(',', '.');
    eel.salvar_editado(id_edit, cod, nome, preco_v, preco_c, estoq)
    eel.mostrar(troca_ordem, ordenacao)

}
