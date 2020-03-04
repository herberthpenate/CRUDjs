var empresas = [];
var num;
var empresa = {
    id: '',
    nombre: '',
    nit: '',
    fecha: '',
    direccion: ''
}
var auxIndex;
var storage = localStorage.empresas;
var tabla = document.getElementById('dataTable');
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    read();
    document.getElementById("form").reset();
})
function create() {

    addData();
    if (storage == null) {
        empresas.push(empresa);
        localStorage.setItem('empresas', JSON.stringify(empresas));
    }
    else {
        empresas = JSON.parse(localStorage.empresas);
        empresas.push(empresa);
        localStorage.setItem('empresas', JSON.stringify(empresas));
    }
}
function addData() {
    if (storage == null) {
        num = 0;
    }
    else {
        empresas = JSON.parse(localStorage.empresas);
        num = empresas.length;
    }
    empresa.id = num;
    empresa.nombre = document.getElementById('nombre').value;
    empresa.nit = document.getElementById('nit').value;
    empresa.fecha = document.getElementById('fecha').value;
    empresa.direccion = document.getElementById('direccion').value;
    console.log(empresa);
}

function read() {
    tabla.innerHTML="";
    let auxEmpresas= JSON.parse(localStorage.empresas);
    if(auxEmpresas==null){
        tabla.innerHTML+=`
        <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>NIT</th>
        <th>Fecha</th>
        <th>Direccion</th>
        </tr>`
    }
    else{
        tabla.innerHTML+=`
        <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>NIT</th>
        <th>Fecha</th>
        <th>Direccion</th>
        <th>Editar</th>
        <th>Eliminar</th>
        </tr>`
        for (let i = 0; i < auxEmpresas.length; i++) {
            tabla.innerHTML+=`
            <tr>
            <td>${auxEmpresas[i].id}</td>
            <td>${auxEmpresas[i].nombre}</td>
            <td>${auxEmpresas[i].nit}</td>
            <td>${auxEmpresas[i].fecha}</td>
            <td>${auxEmpresas[i].direccion}</td>
            <td><button class="btn btn-info" onClick="loadData(${i})">Editar</button></td>
            <td><button class="btn btn-danger" onClick="deleteEmpresa(${i})">Eliminar</button></td>
            </tr>`
            
        }
    }
}


function loadData(index){
    auxIndex=index;
    document.getElementById('insertar').style.display="none";
    document.getElementById('actualizar').style.display="inline-block";
    let empresas = JSON.parse(localStorage.empresas);
    document.getElementById('nombre').value = empresas[index].nombre;
    document.getElementById('nit').value =empresas[index].nit; ;
    document.getElementById('fecha').value =empresas[index].fecha ;
    document.getElementById('direccion').value =empresas[index].direccion;
}
function updateData(){
    let empresas = JSON.parse(localStorage.empresas);
    empresas[auxIndex].nombre = document.getElementById('nombre').value;
    empresas[auxIndex].nit = document.getElementById('nit').value;
    empresas[auxIndex].fecha = document.getElementById('fecha').value;
    empresas[auxIndex].direccion = document.getElementById('direccion').value;
    localStorage.setItem('empresas', JSON.stringify(empresas));
}

function deleteEmpresa(index){
    let empresas = JSON.parse(localStorage.empresas);
    empresas.splice(index,1);
    localStorage.setItem('empresas', JSON.stringify(empresas));
    read();
}