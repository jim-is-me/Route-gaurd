// import React ,{ useState , useEffect} from 'react';
import Card from 'react-bootstrap/Card';
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
        <div>
            <div className="mb-3">
            {todos.map((todo,index)=>(
                <Card style={{ width: '18rem' }} key = {index} className="mb-3">
                    <Card.Body>
                        <Card.Title>{todo.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{todo.date}</Card.Subtitle>
                        <Card.Text>
                            {todo.description}                            
                        </Card.Text>
                        <Button variant="primary" onClick={()=> editTodo(todo)}>Edit</Button>
                        <Button variant="danger">Delete</Button>
                    </Card.Body>
                </Card>
            ))}
            </div>
            <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter title" 
                        defaultValue={edit ? edit.title : ""} 
                        onChange={(event) => onChange({ name: 'title', value: event.target.value })}
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>description</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="description"
                        defaultValue={edit ? edit.description : ""} 
                        onChange={(event) => onChange({ name: 'description', value: event.target.value })} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        placeholder="date"
                        defaultValue={edit ? edit.date : ""} 
                        onChange={(event) => onChange({ name: 'date', value: event.target.value })}  
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={()=>saveTodo(edit)}>
                    Submit
                </Button>
            </Form>
            </div>
        </div>
    )
}