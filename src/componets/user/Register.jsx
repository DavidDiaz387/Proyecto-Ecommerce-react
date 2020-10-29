import React,{Component} from 'react';
import axios from 'axios';

class Register extends Component{
    constructor(){ 
        super()
        this.state = {
            form:{
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                address:"",
                telephone:"",
                dateOfBirth:"",
                image:""
            },
            pass:{
                rpassword:"",
            }
        }
    }
    // Captura los cambios de los imputs de registracion en tiempo real
    inputChange = (e)=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
    };
    // Captura el cambio del input de confirmacion de contraseña
    inputPass = (e)=>{
        this.setState({
            pass:{
                
                [e.target.name]:e.target.value
            }
        })
    };
    // Capturar el nombre de la imagen
    inputImageChange = (e)=>{
        let file = e.target.files[0]
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:file
            }
        })
    };

    // Validar los campos vacios necesarios 
    validarState = (e)=>{
        let {rpassword} = this.state.pass
        let {password,firstName,lastName,email,address,telephone} = this.state.form
        if(password !== "" && rpassword !== "" && firstName !== "" && lastName !== "" && email !== "" && address !== "" && telephone !== ""){
            if(password === rpassword){
                this.methodPost()
            }else{
                // Poner en caso de que las contraseñas no sean iguales
                e.preventDefault()
            }
        }else{
            // poner en caso de que haya campos vacios
            e.preventDefault() 
        }
    };

    // Enviaro por POST los datos del user
    methodPost = async ()=>{
        let form = document.querySelector(".myForm")
        let nuevoForm = new FormData(form)      
        await axios.post("http://localhost:3030/api/users/register",nuevoForm)
        .then(res =>{ return res.data})
        .then(response =>{ console.log(response);})
        .catch(error =>{ console.log(error);})
        window.location.href = "/login"
    }

    render(){
        return(
            <div className="row">
                <form className="col-3 myForm" onSubmit={this.validarState}  >
                    <label htmlFor="">Nombre</label>
                    <input type="text" name="firstName" id="" onChange={this.inputChange} placeholder="Nombre"/>
                    <label htmlFor="">Apellido</label>
                    <input type="text" name="lastName" id="" onChange={this.inputChange} placeholder="Apellido"/>
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" id="" onChange={this.inputChange} placeholder="Email"/>
                    <label htmlFor="">Contraseña</label>
                    <input type="text"name="password" id="" onChange={this.inputChange} placeholder="Contraseña"/>
                    <label htmlFor="">Confirmar contraseña</label>
                    <input type="text" name="rpassword" id="" onChange={this.inputPass} placeholder="Confirmar contraseña"/>
                    <label htmlFor="">Direccion</label>
                    <input type="text" name="address" id="" onChange={this.inputChange} placeholder="Direccion"/>
                    <label htmlFor="">Telefono</label>
                    <input type="number" name="telephone" id="" onChange={this.inputChange} placeholder="Telefono"/>
                    <label htmlFor="">Fecha de nacimiento</label>
                    <input type="date"name="dateOfBirth" id="" onChange={this.inputChange} placeholder="Fecha de nacimiento"/>
                    <label htmlFor="">Foto de Perfil</label>
                    <input type="file" name="image" id="" onChange={this.inputImageChange} placeholder="Foto de Perfil"/>
                    <button className="btn btn-info">Registrarse</button>
                </form>
            </div>
        );
    }
};

export default Register;
