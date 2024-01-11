import './App.css';
import { useState } from 'react';

function App() {

  const [list, setList] = useState([]); //Sempre que se utiliza listas no react, se utilizam 'arrays' []
  const [undid, setUndid] = useState([]);

  const handleClick = (event) =>{ /* A propriedade 'event' proporciona 
  navegar em certas propriedades que acontecem com a função 
  handleClick ao clicar em algum lugar da página. No caso dessa aplicação, 
  o foco é nas propriedades "clientX" e "clientY" */
    
     const newDot = { 
      clientX: event.clientX,
      clientY: event.clientY,
     };

     console.log(newDot);
    //setList(newDot); /* Dessa forma, os valores não são mantidos, sempre o novo vai sobrepor o anteior*/
    setList((prev) => [...prev, newDot]); /* Lógica para manter os valores para poder criar novos.
    /*O 'prev' pega o própio valor da state. 
    Ele nos permite pegar o dado em seu valor original.*/
    /* O 'spread operator', os ..., servem para pegar o valor anterior e "juntar" com o próximo, 
    sem que o anteior se perca*/
    setUndid([]); //esse set serve para limpar o histórico para não trazer os pontos que não podem ser desfeitos
  }

  const handleUndo = (event) => {
    event.stopPropagation(); //evento para não criar pontos em cima do botão.
    console.log('undo');

    if(list.length === 0){ //if para não dar problema quando não tiver nenhum ponto e clicar no botão
      return;
    }

    const lastItem = list[list.length - 1]; //Pegando o último valor do array
    setUndid((prev) =>[...prev, lastItem]);
    

    setList((prev) => { //lógica do botão de "Desfazer"
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });

  }

  const handleRedo = (event) => {
    const recoveredDot = undid[undid.length - 1];
    
    event.stopPropagation();
    console.log("Redo");

    if(undid.length === 0){ /*if para não dar problema quando não tiver nenhum ponto ou quando não tiver 
      mais nenhum ponto para voltar quando clicar no botão */
      return;
    }


    setUndid((prev) =>{
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });

    setList((prev) => [...prev, recoveredDot]);
  };

  return (
    <div id = 'page' onClick={handleClick}>
      <h1>Click point!!</h1>
      {/*{JSON.stringify(list)} {/* Para checar os valores da 'list', se eles estão sendo alterados e mantidos*/}
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      {list.map((item, index) => ( /* Renderizando os pontos de acordo com o clientX e clientY*/
        <span 
          key={index} /* Usando o 'index' para não se repetir valores*/
          className='dot'
          style={{left: item.clientX, top: item.clientY, borderRadius: '50%'}}
        /> 
      ))}
      
      

    </div>
  );
}

export default App;
