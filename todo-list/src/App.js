import React from 'react'
import { useState, useRef, useEffect } from 'react'


export default function App() {


  const [tasks, setTasks] = useState([]);
  const imputTasks = useRef();
  const checkbox =useRef()
 
  useEffect(() => {
    const getTasksFromStorage = JSON.parse(localStorage.getItem('TodoTasks'))
    getTasksFromStorage && setTasks(getTasksFromStorage)
  },[])
  useEffect(() => {
    localStorage.setItem('TodoTasks',JSON.stringify(tasks))
     JSON.parse(localStorage.getItem('TodoTasks'))
    
  },[tasks])
  
 
  function randomId() {
    return Math.round(Math.random() * 9999)
  }
  function handleClickAdd() {
    const task = imputTasks.current.value
    const checked = imputTasks.current.checked
    if (task.length > 1) {
      setTasks((prev) =>
        [...prev, { id: randomId(), value: task, checked }]
      )
      imputTasks.current.value = null
    } else {
      return alert('preencha com uma terefa')

    }
  }
  function test({target}) {
    
   console.log(target.checked);
   const fil = tasks.filter((task)=>task.id === 143)
   //console.log(fil);
    
  }
    function handleTasks() {
      const fil = tasks
      
   /*  if(target.checked === 'true'){
      //remove a li do dom
    target.parentElement.remove() ;

    } */
    
    }
    function removeAllTasks() {
      localStorage.removeItem('TodoTasks')
      setTasks([])
    }
    
    return (<>
     <form>
        <input ref={imputTasks}></input>
        <button type='submit' onClick={() => handleClickAdd()}>adicionar </button>
      <button type='button' onClick={() => removeAllTasks()}>limpar lista </button>
      <button type='button' onClick={() =>handleTasks() }> remover ja prontas </button>

     </form>
      
      <ol>
        {
          tasks.map((task) => <li key={task.id}>
           <label  onClick={(e)=> test(e)}>
              <input type='checkbox' id={task.id} ref={checkbox} onChange={()=> handleTasks()}></input>
              {task.value}
           </label>
           
          </li>)
        }
      </ol>
    </>
    )
  }
