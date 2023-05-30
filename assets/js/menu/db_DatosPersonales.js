const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxjzwV_68pTvmAHNE3xUhvSRgUV1B5icNljQZtWz9p15JTINTYsiIpe1jbp2uNoCsk-/exec';

class DatosPersonales {
    constructor(data, matricula){
        this.Matricula = matricula,
        this.Folio= data[2],
        this.Nombre= data[0],
        this.Apellido= data[1],
        this.Fecha= data[3],
        this.Calle= data[4],
        this.Numero= data[5],
        this.Colonia= data[6],
        this.Municipio= data[7],
        this.CP= data[8],
        this.Telefono= data[9],
        this.Celular= data[10],
        this.Edadv= data[11],
        this.F_Nacimiento= data[12]

    }
    getValues(){
        return {
            "Matricula":this.Matricula,
            "Folio": this.Folio,
            "Nombre": this.Nombre,
            "Apellido":this.Apellido,
            "Fecha":this.Fecha,
            "Calle":this.Calle,
            "Numero":this.Numero,
            "Colonia":this.Colonia,
            "Municipio":this.Municipio,
            "CP":this.CP,
            "Telefono":this.Telefono,
            "Celular":this.Celular,
            "Edad":this.Edad,
            "F_Nacimiento":this.F_Nacimiento            
        }
    }
}
 

const NewInfoForm = [
    document.getElementById('DGEN-IP-01'),
    document.getElementById('DGEN-IP-02'),
    document.getElementById('DGEN-IP-03'),
    document.getElementById('DGEN-IP-04'),
    document.getElementById('DGEN-IP-05'),
    document.getElementById('DGEN-IP-06'),
    document.getElementById('DGEN-IP-07'),
    document.getElementById('DGEN-IP-08'),
    document.getElementById('DGEN-IP-09'),
    document.getElementById('DGEN-IP-10'),
    document.getElementById('DGEN-IP-11'),
    document.getElementById('DGEN-IP-12'),
    document.getElementById('DGEN-IP-13'),
    document.getElementById('DGEN-IP-14')    
];

const btn_Enviar =  document.getElementById('DGEN_enviar');

function ValidateForm() {
    let getblanks = 0;
    let getValues = [];
    NewInfoForm.forEach(item => {
        if (item.value!='') {
            getValues.push(item.value);
            console.log(item.value);
        }else{
            getblanks++;
        }
    });
        
    console.log(getblanks +' '+  NewInfoForm.length +' '+ getValues.length);
    if(getblanks==0 && NewInfoForm.length == getValues.length){
        FormatData(getValues);
    }
}

function FormatData(values) {
    const newPV = new DatosPersonales(values,Matricula);
    console.log(newPV.getValues());
    //SendData(newPV.getValues(), "Datos Personales");     
}


function init() {
    console.log(Matricula);
    ValidateForm();

}

btn_Enviar.addEventListener('click', function() {
    init();
});

function SendData(Values, sheet) {
    setTimeout(function (){        
        $.ajax({
            crossDomain: true,
            url: WEB_APP_URL,
            type: "POST",
            data : {"Values":JSON.stringify(Values), "Sheet":sheet},
            success: function(data){
                console.log(data);
            },
            error: function(err) {
                console.log('Error:', err);
            }
        });
        return false;
    }, 1000);    
}