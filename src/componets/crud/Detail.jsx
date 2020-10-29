import React,{Component} from 'react'
import axios from 'axios';
class Detail extends Component{
    constructor(){
        super()
        this.state = {
            name:"",
            price:"",
            image:""
        }
    }

    componentDidMount(){
        this.methodGet()
    }

    methodGet = async ()=>{
        await axios.get("http://localhost:3030/api/products/detail")
        .then(res =>{
            return res 
        })
        .then(res =>{
            this.setState({
                image:res.data.image,
                name:res.data.name,
                price:res.data.price
            })
        })
        .catch(error => console.log(error))
        
        
            
    }

    render(){
        return(
            <div>
                <h1>Funciona el Detail</h1>
                <img src={this.state.image} alt="iamgen"/>
            </div>
        );
    }
};

export default Detail;