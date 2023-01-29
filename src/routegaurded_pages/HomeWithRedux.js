import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from "../slices/appSlice";
import axios from "axios";

export default function HomePage() {

    const [edit, setEdit] = useState({});
    const dispatch = useDispatch();
    const todos = useSelector(state => state.app.todos)

    useEffect(() => {
        dispatch(getTodos());
    }, []);

    const editTodo = (todo) => {
        setEdit(todo);
    }

    const saveTodo = async (todo) => {
        if(todo === undefined){
            alert("ENter a value")
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
                    <div className="card" key={index}>
                        
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
                            <label>Title</label>
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
                            <label>Description</label>
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
                    <div>
                        <div className="col-25">
                            <label>Date</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="date"
                                defaultValue={edit ? edit.date : ""} 
                                onChange={(event) => onChange({ name: 'date', value: event.target.value })}  
                                id="date"
                                name="date"
                            />
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