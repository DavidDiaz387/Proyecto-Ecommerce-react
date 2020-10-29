import React,{Component} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies()

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId:props.match.params.id,
            user:{
                firstName:"",
                lastName:"",
                email:"",
                address:"",
                telephone:"",
                dateOfBirth:"",
                image:""
            }
        }
    }
    // Funcion para llamar al usuario que inicio sesion
    methodGet = async ()=>{
        let {userId} = this.state
        await axios.get(`http://localhost:3030/api/users/profile/${userId}`)
        .then(response =>{
            this.setState({
                user:{
                    ...response.data
                }
            })
        })
        .catch()
    }

    // Funcion para cerrar sesion 
    sesionOut = ()=>{
        if(cookie.get("userId")){
            console.log(cookie.get("userId"));
        }
    }

    // Componente para poder iniciar todo
    componentDidMount(){
        this.methodGet()
    }

    render(){
        let {firstName,lastName,email,address,telephone,dateOfBirth,image} = this.state.user
        return(
            <div className="col-12">
                <div className="col-3">
                    <p>Nombre:{firstName} </p>
                </div>
                <div className="col-3">
                    <p>Apellido:{lastName} </p>
                </div>
                <div className="col-3">
                    <p>Email:{email} </p>
                </div>
                <div className="col-3">
                    <p>Direccion:{address} </p>
                </div>
                <div className="col-3">
                    <p>Telefono:{telephone} </p>
                </div>
                <div className="col-3">
                    <p>Fecha de nacimiento:{dateOfBirth} </p>
                </div>
                <div className="col-3">
                    <img src={"http://localhost:3000/"+image} alt="foto de perfil"/>
                </div>
                <div className="col-3">
                    <button onClick={()=>this.sesionOut()} >Cerrar sesion</button>
                </div>
            </div>
        );
    }
};

export default Profile;