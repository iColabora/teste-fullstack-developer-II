import { useState,useEffect } from 'react'
import logo from './logo.svg'
import './App.css';
import './style/style.scss';


const App = () =>{

  const [campo,setCampo] = useState([
  ]);

  const criarCampo = (id,label,categoria)=>{
    id = document.querySelector('#campo1').value;
    label = document.querySelector('#campo2').value;
    categoria = document.querySelector('#campo3').value;
    let length=0;
    if(categoria=='texto simples'){
      length = 30;
    }else{
      length = 100;
    }
    if(campo.length<5){
    setCampo([...campo,{id:id,label:label,categoria:length}]);
    }
  }

  const removerCampo = (index) => {
    const temp = [...campo];
    temp.splice(index, 1);
    setCampo(temp);
  };
  return(
    <div className='container'>
      <div className='campos'>
          <label>Id <br />
          <input type="number" id='campo1' placeholder='Digite o ID do campo' style={{width:"200px"}} required />
          </label>

          <label>Label <br />
          <input type="text" id='campo2' placeholder='Digite o label a ser exibido no campo' style={{width:"200px"}} required/>
          </label>

          <label> Categoria <br />
          <select name="categoria" id="campo3" placeholder='Categoria' style={{width:"200px"}} required>
            <option value="texto simples" id='op1'>Texto Simples</option>
            <option value="texto grande" id='op2'>Texto Grande</option>
          </select>
          </label>
          <br />
          <input type="submit" value='Criar Campo' onClick={criarCampo}/>
      </div>
      <hr />
      <div className='camposCriados'>
      {campo.map((item,index)=>(
        <div key={index}>
          <label>{item.label.toUpperCase()} <br />
          <input type="text" id={item.id} maxLength={item.categoria} /> <button onClick={removerCampo}>Apagar</button> <button>Salvar</button>
          </label>
        </div>
      ))}
      </div>
    </div>

  );

}

export default App
