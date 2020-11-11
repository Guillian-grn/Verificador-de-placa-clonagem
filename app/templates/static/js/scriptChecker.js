$('#uploadFile').on('change', function() {
  let fileName = $(this).val().split('\\').pop();
  $('#uploadFileText').text(fileName);
});

$("#btnSubmit").click(function() {
	  var val = validate();
	  
	  if (val == 0){
		  
		  var e = document.getElementById("estado");
		  var c = document.getElementById("cidade");
		  var v_estado = e.options[e.selectedIndex].value;
		  var v_cidade = c.options[c.selectedIndex].value;
		  
		// disable button
		$(this).prop("disabled", true);
		// add spinner to button
		$(this).html(
			'<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verificando...'
		);
		$("#formScript").submit();
	  }else{
		  
	  }
});

function validate(){
	if ($("#uploadFileText").text() == 'Selecionar Arquivo'){
		alert("Favor selecionar arquivo para validação!");
		return 1;
	}else{
		return 0;
	}
}

function todaysDate(){
    var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth();
    var yy = d.getFullYear();
	
	alert(dd + "/" + mm + "/" + yy);

	var date = document.getElementById("dateInput").placeholder = (dd + "/" + mm + "/" + yy);
  };

/*
function editFlows(id) {
  var vname = $("#flowName").text();
  var vdesc = $("#flowDesc").text();
  var e = document.getElementById("flowSts");
  var vstatus = e.options[e.selectedIndex].value;
  var vdate = rDate();

  $.post('/flows/edit/'+id,
  {
    name: vname,
    desc: vdesc,
    status: vstatus,
    date: vdate
  },
  function(data){
    alert("Chamou?!\n "+ data);
  });

  function rDate(){
    var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth();
    var yy = d.getFullYear();
    return (dd + "/" + mm + "/" + yy);
  };
  

}
*/
// ESTE SERIA O CONTEÚDO DO .js
var json_cidades = {
  "estados": [
    {
      "sigla": "SP",
      "nome": "São Paulo",
      "cidades": [
        "Américo Brasiliense",
        "Araraquara",
        "Ribeirão Preto",
        "São Carlos",
		"São Paulo"
      ]
    },
    {
      "sigla": "SL",
      "nome": "Selecione o estado",
      "cidades": [
        "Selecione a cidade"
      ]
    },
    {
      "sigla": "RJ",
      "nome": "Rio de Janeiro",
      "cidades": [
        "Angra dos Reis",
        "Armação de Búzios",
        "Arraial do Cabo",
        "Duque de Caxias",
        "Niterói",
        "Nova Friburgo",
        "Parati",
        "Rio de Janeiro",
		"São Gonçalo",
        "Volta Redonda"
      ]
    }
  ]
};

function buscaCidades(e){
   document.querySelector("#cidade").innerHTML = '';
   var cidade_select = document.querySelector("#cidade");

   var num_estados = json_cidades.estados.length;
   var j_index = -1;

   // aqui eu pego o index do Estado dentro do JSON
   for(var x=0;x<num_estados;x++){
      if(json_cidades.estados[x].sigla == e){
         j_index = x;
      }
   }

   if(j_index != -1){
  
      // aqui eu percorro todas as cidades e crio os OPTIONS
      json_cidades.estados[j_index].cidades.forEach(function(cidade){
         var cid_opts = document.createElement('option');
         cid_opts.setAttribute('value',cidade)
         cid_opts.innerHTML = cidade;
         cidade_select.appendChild(cid_opts);
      });
   }else{
      document.querySelector("#cidade").innerHTML = '';
   }
}


