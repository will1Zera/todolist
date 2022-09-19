import './App.css';
import { useState, useEffect } from 'react';

// Salva a lista de tarefas no localStorage
const getLocalItem = () =>{
  let lists = localStorage.getItem('list');
  if(lists){
    return JSON.parse(localStorage.getItem('list'));
  } else{
    return [];
  }
};

export default function App() {
  const [title, setTitle] = useState(""); // Tarefas
  const [tasks, setTasks] = useState(getLocalItem()); // Array de tarefas
  
  // Função que ativa após clicar no botão "Adicionar"
  const handleSubmit = (e) =>{
    e.preventDefault(); // Página deixa de recarregar

    if (title === ""){
      console.log("Tarefa não adicionada");
    } else{ // Cria um id para cada tarefa
      const randomId = (num) => Math.floor(Math.random() * num);
      const todo ={
        id: randomId(123456789),
        title,
        isComplete: false,
      };
      setTasks([ ...tasks, todo]) // Adiciona uma nova tarefa no array
    };
    setTitle(""); // Limpa o input de tarefa
  };

  // Verrifica e marca como tarefa completa
  function handleCompletion(id){
    const todo = tasks.map(title =>{
      if(title.id === id){
        return {...title, isComplete: !title.isComplete}
      };
      return title;
    })
    setTasks(todo);
  };

  // Deleta a tarefa
  function handleDelete(id){
    setTasks(tasks.filter(remove => remove.id !== id))
  };

  // Cria a lista de tarefas no localStorage
  useEffect(() =>{
    localStorage.setItem('list', JSON.stringify(tasks))
  }, [tasks]);

  return (
    <div className="app">
      <h1 className="title">Lista de tarefas</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" name="title" className="input_text" placeholder="Digite sua tarefa" onChange={(e) => setTitle(e.target.value)} value={title || ''} required />
        </label>
        <input type="submit" value="Adicionar" className="input_button"/>
      </form>

      {tasks.map((title) =>(
      <div key={title.id} className='task_container'>
        <div className={title.isComplete ? 'task completed' : 'task'}>
          <div className='task_title'>
            <button onClick={() => handleCompletion(title.id)}><i className='bx bx-check'></i></button><p>{title.title}</p>
          </div>
          <div>
            <button onClick={() => handleDelete(title.id)}><i className='bx bx-trash'></i></button>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

