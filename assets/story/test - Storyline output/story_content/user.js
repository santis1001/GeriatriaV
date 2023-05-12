function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6mYNGJVy81s":
        Script1();
        break;
      case "6G7tZOZRLeR":
        Script2();
        break;
      case "5k362qFn3g9":
        Script3();
        break;
  }
}

function Script1()
{
  var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.src = '//code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
head.appendChild(script)
}

function Script2()
{
  var player = GetPlayer();
 
//PLACE YOUR WEB APP URL
WEB_APP_URL = "Current web app URL";
 
// STORE ARTICULATE STORYLINE VARIABLES
// "Columnname_Google_Spreadsheet" : player.GetVar("Name_Storyline_Variable")
// ATTENTION: Use a comma if you use multiple Storyline variables

}

function Script3()
{
  var player = GetPlayer();
const WEB_APP_URL ='https://script.google.com/macros/s/AKfycbxPfCtKgFidDv-KeEaXcD4QCvFck8EPjGk22MgLPMKXD7mp8CzjAdyuWlHBHqr_m-9q/exec';
 
 
storyline =
{
 	"Nombre":player.GetVar("str_Nombre"), 
    "Apellido": player.GetVar("str_Apellido"), 
    "Sexo": player.GetVar("str_Sexo"), 
    "Edad": player.GetVar("str_Edad"), 
    "Peso": player.GetVar("str_Peso"), 
    "Altura": player.GetVar("str_Altura"), 
    "ResultadoE1":player.GetVar("strn_ResE1"), 
    "DiagnosticoE1":player.GetVar("str_DiaE1"), 
}

setTimeout(function (){
 
//Export to Google
$.ajax({
url: WEB_APP_URL,
type: "POST",
data : storyline,
success: function(data)
{
console.log(data);
},
error: function(err) {
console.log('Error:', err);
}
});
return false;
}, 1000);
}

