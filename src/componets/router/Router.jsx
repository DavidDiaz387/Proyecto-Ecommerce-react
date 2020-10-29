import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

//Importar todos los componentes para las rutas del CRUD Products
import Home from '../Home';
import Create from '../crud/Create';
import Detail from '../crud/Detail';
import Edit from '../crud/Edit';
import Products from '../crud/Products';

//Importar todos los componentes del Usuario
import Login from '../user/Login'
import Register from '../user/Register'
import Profile from '../user/Profile'

// Importar carrito de compras
import CheckOut from '../card/CheckOut'

const Router = ()=>(

    <BrowserRouter> 
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/asdasdasdas" component={Products} />
            <Route exact path="/products/edit/:id" component={Edit} />
            <Route exact path="/products/create" component={Create} />
            <Route exact path="/products" component={Detail} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/checkOut" component={CheckOut} />
        </Switch>
    </BrowserRouter>

)

export default Router;