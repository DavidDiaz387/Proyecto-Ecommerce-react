import React,{Component} from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Cookies from 'universal-cookie';
import GoogleLogin from 'react-google-login';

const cookie = new Cookies()

class Login extends Component{
    constructor(){
        super()
        this.state = {
            user:{
                email:"",
                password:""
            },
            userCoockie:{
                remember:false
            }
        }
    }

    // Captura los cambios de los imputs en tiempo real
    inputChange = (e)=>{
        this.setState({
            user:{
                ...this.state.user,
                [e.target.name]:e.target.value
            }
        })
    };

    

    // Validar los campos vacios necesarios 
    validarState = (e)=>{ 
        let {password,email} = this.state.user
        if(password !== "" && email !== ""){
            this.methodGet()
        }else{
            // No pude dejar los campos vacios
            alert("No podes dejar los campos vacios")
        }
    };

    checkChange = (e)=>{
        console.log(this.state.userCoockie.remember)
        this.setState({
            userCoockie:{
                [e.target.name]:e.target.checked
            }
        })
    };

    // Enviaro por POST los datos del user
    methodGet = async ()=>{
        let {remember} = this.state.userCoockie
        let {email,password} = this.state.user
        await axios.get("http://localhost:3030/api/users/login")
        .then(response =>{
            let user = response.data.find(user =>{return user.email === email && bcrypt.compareSync(password,user.password) }  )
                if(user){
                    if(remember){
                        cookie.set("userId",user.id,{path:"/"})
                        cookie.set("userEmail",user.email,{path:"/"})
                        window.location.href = "/profile/"+user.id
                    }
                    window.location.href = "/profile/"+user.id
                }else{
                    alert("No se encontro usuario")
                }
        })
        .catch(error => console.log(error)) 
    }

    // Login con Google autenticacion ! 
    responseGoogle = ()=>{

    }

    render(){

        

        return(
            <div className="row">
                <label htmlFor="">Email</label>
                <input type="text" name="email" id="" onChange={this.inputChange} placeholder='Email'/>
                <label htmlFor="">Password</label>
                <input type="text" name="password" id="" onChange={this.inputChange} placeholder="Password"/>
                <label htmlFor="">Recordame</label>
                <input type="checkbox" name="remember" checked={this.state.userCoockie.remember} onChange={this.checkChange} id=""/>
                <button className="btn btn-info"
                    onClick={()=>this.validarState()}

                >Login</button>
                <GoogleLogin
                    clientId="718415755255-l3a9qv4d8mjugcao6t1d2488fld7kgki.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    }
};

export default Login;