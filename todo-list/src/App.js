import React from 'react'
import { useState, useRef, useEffect } from 'react'


export default function App() {


  const [tasks, setTasks] = useState([]);
  const imputTasks = useRef();
 
  useEffect(() => {
    const getTasksFromStorage = JSON.parse(localStorage.getItem('TodoTasks'))
    getTasksFromStorage && setTasks(getTasksFromStorage)
  },[])
  useEffect(() => {
    localStorage.setItem('TodoTasks',JSON.stringify(tasks))
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
    function handleClickDelete() {

    }
    return (<>
      <input ref={imputTasks}></input>
      <button type='submit' onClick={() => handleClickAdd()}>'adicionar '</button>
      <ol>
        {
          tasks.map((task, index) => <li key={task.id}>
            <input type='checkbox' value={!task.done}></input>
            {task.value}
            <button onClick={() => handleClickDelete()}>'x'</button>
          </li>)
        }
      </ol>
    </>
    )
  }
