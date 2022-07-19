import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { useNavigate } from "react-router-dom";
import config from './../../helpers/config.json';

const UsersEdit = () => {
    let navigate = useNavigate();
    let userData = JSON.parse(sessionStorage.getItem("user")); 
    const cancel = () => {
        var {userName, nivel} = document.forms[0]; 
        var hasChanges = userName.value.length > 0 ||  nivel.value.length > 0 ;
        if(hasChanges){
            if(window.confirm("Existen cambios sin guardar. ¿Seguro de querer cancelar?")){
                navigate("/users");
            }
        } else {
            navigate("/users")
        }
    }

    const save = async (event) => {
        event.preventDefault();
        var {userName, nivel} = document.forms[0];
        var errors = "";
        if(errors.length > 0){
            window.alert("Corrija los siguientes errores:\n"+errors);
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ "operatorId": config.operatorId, "name": userName.value,"nivel": nivel.value})
              }
              fetch(config.apiURL+"users/"+userData.id, requestOptions).then((response) => {
                switch(response.status){
                  case 400:
                    console.log("consulta mal formada");
                    break;
                  case 403:
                    console.log("acceso prohibido");
                    break;
                  default:
                    //
                }
                return response.json();
              }).then((result) => {
                  window.alert("Actualizacion existosa");
                  navigate("/users");
              })
        }
    }
    return (<div>
            <Topbar />
            <Sidebar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Incorporación de Usuario</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Cerrar Sesión</a></li>
                                    <li className="breadcrumb-item"><a href="/users">Usuarios</a></li>
                                    <li className="breadcrumb-item active">Editar</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={save}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="userName" className="control-label">Nombre</label>
                                        <input type="text" name="userName" id="userName" className="form-control" defaultValue={userData.name} required />
                                    </div>
                                </div>
                                <div class="col-6">
                <label htmlFor="nivel" className="control-label">Nivel</label>
                <select name="nivel" id="nivel" className="form-control" defaultValue={userData.name} required >
                    <option value="0">-- --Seleccione</option>
                    <option value="1">Administrativo</option>
                    <option value="2">Vendedor</option>
                </select>
            </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" onClick={cancel} className="btn btn-secondary"><i className="fas fa-times"></i> Cancelar</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Guardar</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default UsersEdit;