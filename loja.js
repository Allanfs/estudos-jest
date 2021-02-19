'use strict'

$("label[id^='dia-semana']").children().click(function(){
	status_select =  getStatusCheckboxDiasSemana();
	$("select[id^='id_tipo_conciliacao_']").prop('disabled', status_select);

	if($("#conciliar-sangria-conciliacao-fixa").children().attr('checked') != 'checked'){
		alteraStatusInputContainerConciliar(true);
}

});


function alteraStatusInputContainerConciliar(checked){
	array_container = $("#container-conciliar-cofre label");
	status_input = checked;

	// $.each(array_container, function(indice, value){
	// 	id_input = $(value).attr('for');

	// 	// if ($("#"+id_input).is('select')) {

	// 	// 	$("#"+id_input).on('select2:select', () => {
	// 	// 		this.attr('readonly', true);
	// 	// 	  });
			
	// 	// 	// if (status_input == true) {
	// 	// 	// 	$("#"+id_input).addClass("disabled-auto-open-select2");
	// 	// 	// }else {
	// 	// 	// 	$("#"+id_input).removeClass("disabled-auto-open-select2");
	// 	// 	// }
	// 	// 	// $("#"+id_input).select2().enable(status_input);
	// 	// }else {
	// 		$("#"+id_input).prop('readonly', status_input);
	// 	// }

	// });

	if($("#conciliar-sangria-conciliacao-fixa").children().attr('checked') == 'checked'){
		status_select =  getStatusCheckboxDiasSemana();
	if (status_select == true)
		$("select[id^='id_tipo_conciliacao_geral']").prop('readonly', status_select);
	else
		$("select[id^='id_tipo_conciliacao_geral']").removeAttr('readonly');
	}

}

$(document).ready(function(){
	var divSerialCofre = $('#id_div_serial_cofre');
	var divLimiteCofre = $("#id_div_limite_cofre");
	var maximo_campos = 5;
	$('#btn-add-serial-cofre').click(function(e){
		e.preventDefault();
		var permissao = $(this).attr('data-id');
		if(permissao === "true"){
			if(idCampoSerial < maximo_campos){
				idCampoSerial++;
				$(divSerialCofre).append(`<div id="campo_serial_cofre_${idCampoSerial}">
				<a href="#" class="remove_campo_serial_cofre pull-right btn-rm-aux" id="btn_remove_campo_serial">
		  			<i class="fa fa-minus-circle"></i>
				</a>
				<input class="form-control serial_cofre_inserido" type="text" name="serial_cofre_list"/></div>`);
				
				htmlCampoLimiteCofre = `<div id="campos_limite_cofre_${idCampoSerial}">
				<br><input class="form-control serial_cofre_inserido" type="text"
				name="limite_cofre_list" mask="decimal" value="0.00"/></div>`;
				$(divLimiteCofre).append(htmlCampoLimiteCofre)
				callFunctionsAfterJsEvent();
				calcularDiferenca();
			}
		}
	});

	$(divSerialCofre).on('click','#btn_remove_campo_serial', function(e){
		e.preventDefault();
		if(idCampoSerial >= 2){
			/**
			 * Obtem o ID Campo Serial da Div do Serial Cofre para Relacionar
			 * com a mesma posicao das Colunas do Limite Cofre no Intuito de
			 * remover as colunas.
			 */
			let tmpCampoSerial = $(this).parent('div')[0].id.split('_')[3];
			document.getElementById('campos_limite_cofre_' + tmpCampoSerial).remove();
			$(this).parent('div').remove();
			idCampoSerial--;
			calculaColuna('limite_cofre_list','id_limite_geral', true);
		} 
	})

//Verificar campos ativar_loja_transacional e loja_transacional
var ativar_loja_transacional_check = $('#id_ativar_loja_transacional').is(':checked')
var loja_transacional_input = $("#id_loja_transacional").val();
if (ativar_loja_transacional_check == false && loja_transacional_input === ''){
  $("#id_loja_transacional").prop('disabled', true);
}
$('#id_ativar_loja_transacional').on('change', function (){
		if ($(this).is(':checked')) {
        $("#id_loja_transacional").prop('disabled', false);
		} else {
        $("#id_loja_transacional").prop('disabled', true);
		}
});


});

function calcularDiferenca () {
	$('.serial_cofre_inserido').keyup(function(){
		calculaColuna('limite_cofre_list','id_limite_geral', true);
	});
};

function calculaColuna(nome_coluna, id_total, mask) {

	let colunaTotal = document.getElementById(`${id_total}`);
	let colunas = document.getElementsByName(nome_coluna);

	var total = 0;
	if (mask === true){
		  colunas.forEach(function(x){
			 total += parseFloat(x.value.replace(/[^0-9.,-]/g, '').replace(/\./g, "").replace(/,/g, "."));
		  });
	}else{
		  colunas.forEach(function(x){
			  total += parseFloat(x.value);
		  });
	}
	  total = numberToReal(total);
	  colunaTotal.value = total;
}


function numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}
