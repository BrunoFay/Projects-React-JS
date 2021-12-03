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
    if (task.length > 1) {
      setTasks((prev) =>
        [...prev, { id: randomId(), value: task, done: false }]
      )
      imputTasks.current.value = null
    } else {
      return alert('preencha com uma terefa')

    }
  }
    function handleTasks({target}) {
      const removeTask =checkbox.current.value
      console.log(removeTask);
    if(target.value === 'on'){
      //remove a li do dom
    //  target.parentElement.parentElement.remove() ;

    }
    
    }
    function removeAllTasks() {
      localStorage.removeItem('TodoTasks')
      setTasks([])
    }
    return (<>
     <form>
        <input ref={imputTasks}></input>
        <button type='submit' onClick={() => handleClickAdd()}>'adicionar '</button>
      <button type='button' onClick={() => removeAllTasks()}>'limpar lista '</button>
     </form>
      
      <ol>
        {
          tasks.map((task) => <li key={task.id}>
           <label  >
              <input type='checkbox' value={'on'&& !task.done} ref={checkbox} onChange={(e)=> handleTasks(e)}></input>
              {task.value}
           </label>
           
          </li>)
        }
      </ol>
    </>
    )
  }
