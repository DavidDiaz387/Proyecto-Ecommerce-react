import React, { Fragment,  useState } from 'react';
import axios from 'axios';


const AgregarProducto = ({ history }) => {
  const [producto, setProducto] = useState({
    name: '',
    price: '',
    image:'',
  })
  

  const handleChange= (e)=>{

    setProducto({
      
      ...producto,//copia del producto actual
      [e.target.name]:e.target.value
    })
    
  }
  const handleImage= (e)=>{
   console.log(e.target.files[0])
    setProducto({
        ...producto,
      //image:e.target.files[0].name//error grave sacar el name 
      image:e.target.files[0]

    })
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    //guardar producto
    guardarProducto()
   
    
  
  }

const guardarProducto = async (e) => {
  let form = document.querySelector("#form")
  let nuevoForm = new FormData(form)
  
  await axios.post('http://localhost:3030/api/products/create/macario',nuevoForm)
  .then(res => {
    console.log(res)
  })
   .catch(error =>{ console.log(error);})
  }

  /*const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
*/

  return (
    <Fragment>
      <h2>Nuevo Producto</h2>

      <form id="form" onSubmit={handleSubmit} >
        <div className='form-group'>
          <label htmlFor='nombre'>Nombre</label>
          <input
            type='text'
            className='form-control'
            name='name'
            placeholder='Ingresar nombre'
            onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='precio'>Precio</label>
          <input
            type='number'
            className='form-control'
            name='price'
            placeholder='Ingresar un precio'
            
             onChange={handleChange}
             />
        </div>
        <div className='form-group'>
          <label htmlFor='img'>Imagen</label>
          <input
            type='file'
            className='form-control'
            name='image'
            accept='image/*'
             onChange={handleImage}
           />
        </div>
      

        <button
          className='btn btn-primary'
        > guardarProducto
             </button>
      </form>
    </Fragment>
  )
}

export default AgregarProducto