const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxjzwV_68pTvmAHNE3xUhvSRgUV1B5icNljQZtWz9p15JTINTYsiIpe1jbp2uNoCsk-/exec';

const login = document.getElementById('login-form');
const signup = document.getElementById('register');
const u_matricula = document.getElementById('Matricula');
const u_nombre = document.getElementById('Nombre');
const u_contrasena = document.getElementById('Contrasena');
const u_Grupo = document.getElementById('Grupo');
const doc_error = document.getElementById('errorModal');

let regis = false;

login.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("login");
    if (u_contrasena.value != '' && u_matricula.value != '') {
        GetData(u_matricula.value, u_contrasena.value, "ControlAcceso")
            .then(function (data) {
                console.log(data)
                if(data.result == 'success'){
                    const url = (data.URL);
                    window.location.href = url
                }else{
                    document.getElementById('errorMsg').textContent = 'Credenciales Incorrectas';
                    showError();
                }
            })
            .catch(function (error) {
                console.log(error)
                document.getElementById('errorMsg').textContent = 'No Existe Usuario';
                showError();
            });

    }

});

signup.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("regis");
    if (regis) {
        regis = false
        if (u_contrasena.value != '' && u_matricula.value != '' && u_nombre.value != '' && u_Grupo.value != '') {
            pushData(u_matricula.value, u_nombre.value, u_contrasena.value, u_Grupo.value, "ControlAcceso")
                .then(function (data) {
                    console.log(data)
                    if(data.result == 'success'){
                        const url = (data.URL);
                        window.location.href = url
                    }else{
                        document.getElementById('errorMsg').textContent = 'Usuario ya existe';
                        showError();
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    showError();
                });
        }
    }else{
        document.getElementById('login_content').setAttribute('class','row justify-content-center d-none');
        document.getElementById('grupo_content').setAttribute('class','mb-3');
        document.getElementById('name_content').setAttribute('class','mb-3');
        regis = true;
    }

});

function showError() {
    doc_error.setAttribute('class', 'row justify-content-center my-4 mx-1');
    setTimeout(function () {

        doc_error.setAttribute('class', 'row justify-content-center my-4 mx-1 d-none');
    }, 3000);

}

function pushData(matricula, nombre, contrasena, grupo, sheet) {

    const info = {
        "Matricula": matricula,
        "Nombre": nombre,
        "Contrasena": contrasena,
        "Grupo": grupo
    };

    return new Promise(function (resolve, reject) {
        $.ajax({
            crossDomain: true,
            url: WEB_APP_URL,
            type: "POST",
            data: { "Info":JSON.stringify(info), "Sheet": sheet },
            success: function (data) {
                console.log(data);
                resolve(data);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}
function GetData(matricula, contrasena, sheet) {
    const info = {
        "Matricula": matricula,
        "Contrasena": contrasena,
    };
    return new Promise(function (resolve, reject) {
        $.ajax({
            crossDomain: true,
            url: WEB_APP_URL,
            type: "GET",
            data: { "Info": JSON.stringify(info), "Sheet": sheet },
            success: function (data) {
                console.log(data);
                resolve(data);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}
