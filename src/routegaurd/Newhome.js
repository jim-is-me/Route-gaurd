// import React ,{ useState , useEffect} from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function HomePage() {

    const [todos,setTodos] = useState([]);
    const [edit, setEdit] = useState({});

    useEffect(() => {
        const loadTodo = async () => {
        const result = await axios.get(`http://localhost:8000/todos/`);
          setTodos(result.data);
          console.log(result)
        }
        loadTodo();
    }, []);

    const editTodo = (todo) => {
        setEdit(todo);
    }

    const saveTodo = async (todo) => {
        console.log(todo,"eag")
        if(todo === undefined){
            console.log("ENter a value")
            return
        }
        if(todo._id !== undefined){
            const result = await axios.put(`http://localhost:8000/todos/${todo._id}`,{
                data: todo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(resp=>{
                console.log(resp)
                alert("Saved")
            })
        } else {
            const result = await axios.post(`http://localhost:8000/todos/`,{
                data: todo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(resp=>{
                console.log(resp)
                alert("Saved")
            })
        }
    }

    const handleSubmit = event => {
        // 👇️ prevent page refresh
        event.preventDefault();
    
        console.log('form submitted ✅');
    };

    const onChange = data => {
        const name = data.name;
        const value = data.value;

        setEdit(prevSate => {
            const temp = JSON.parse(JSON.stringify(prevSate));
            temp[name] = value;
            return temp;
        });

    };

    return(
        <div className="flexi">
            <div className="flex">
                {todos.map((todo,index)=>(
                    <div className="card">
                        
                        <h2>{todo.title}</h2>
                        <p>{todo.description}</p>
                        <p>{todo.date}</p>
                        <footer>
                            <button onClick={()=> editTodo(todo)}>Edit</button>
                        </footer>
                    </div>
                ))}
            </div>
            <div className="container">
                <form>
                    <div className="row">
                    <div className="col-25">
                        <label for="fname">Title</label>
                    </div>
                    <div className="col-75">
                        <input
                            defaultValue={edit ? edit.title : ""} 
                            onChange={(event) => onChange({ name: 'title', value: event.target.value })}
                            type="text" id="fname" 
                            name="firstname" placeholder="Your title.." />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-25">
                        <label for="lname">Description</label>
                    </div>
                    <div className="col-75">
                        <input 
                            type="text"
                            defaultValue={edit ? edit.description : ""} 
                            onChange={(event) => onChange({ name: 'description', value: event.target.value })}  
                            id="lname"
                            name="lastname"
                            placeholder="Your description.." />
                    </div>
                    </div>
                </form>
                <footer>
                    <button className="submit" onClick={()=>saveTodo(edit)}>Save</button>
                </footer>
            </div>
        </div>
    )
}