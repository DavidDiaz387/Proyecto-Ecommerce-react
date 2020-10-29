import React,{Component} from 'react';
import Rutas from './componets/router/Router'

class App extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

  render(){
    return(
      <div className="container">
        <Rutas/>

      </div>
      
    );
  }
  
}

export default App;
