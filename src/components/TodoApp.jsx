import { useEffect, useState } from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import './TodoApp.css'

export default function TodoApp(){
    let [todos, setTodos] = useState(localStorage.getItem("Todos") ? JSON.parse(localStorage.getItem("Todos")) : []);  //New concept of Local Storage
    let [newTodo, setNewTodo] = useState("");

    let addTodo = () => {
        if (newTodo){
            setTodos((prevTodo) => {
                return [...prevTodo, {task: newTodo, id: uuidv4(), isDone: false}]
            });
            setNewTodo("");
        }
    }

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value)
    }

    let deleteTask = (id) => {
        setTodos((prevTodos) => 
            todos.filter((prevTodos) => prevTodos.id != id)
        )
    }

    let markAllDone = () => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
                return {
                    ...todo, isDone: !todo.isDone
                }
            })
        ))
    }

    let MarkOneDone = (id) => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
                if (todo.id === id){
                    return {
                        ...todo, isDone: !todo.isDone
                    }
                } else {
                    return todo
                }
            })
        ))
    }

    useEffect(() => {
        localStorage.setItem("Todos", JSON.stringify(todos))   //New concept of Local Storage
    }, [todos])

    return(
        <div id="outerContainer">
            <div id='innerContainer1'>
                <EditCalendarIcon/>&nbsp;&nbsp;To-Do List
            </div>
            <div id='innerContainer2'>
                <input placeholder="Type your Task" id="inputElement" value={newTodo} onChange={updateTodoValue}/>&nbsp;
                <button id="buttonElement" onClick={addTodo}>Add <span style={{fontSize: "1.7rem", marginLeft: "0.3rem"}}>+</span></button>
            </div>
            <div id="innerContainer3">
                <ul>
                    {
                        todos.map((todo) => (
                            <li key={todo.id}>
                                <div id="innerMostDiv1">
                                    <button onClick={() => MarkOneDone(todo.id)}>{todo.isDone ? <CheckCircleIcon/> : <RadioButtonUncheckedIcon/>}</button>
                                    <span style={todo.isDone ? {textDecorationLine: "line-through"} : {}}>{todo.task}</span>
                                </div>
                                <div id="innerMostDiv2">
                                    <button onClick={() => deleteTask(todo.id)}><DeleteIcon/></button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div id="innerContainer4">
                <button onClick={markAllDone}>Mark All Done</button>
            </div>
        </div>
    )
}