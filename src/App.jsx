import { useState } from 'react'
import ToDoList from "./components/ToDoList.jsx";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ToDoList></ToDoList>
  )
}

export default App
