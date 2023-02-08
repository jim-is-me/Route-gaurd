import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const [loginForm, setLoginForm] = useState({ userName: "", password: "" });
  const [error, setError] = useState({});

  function handleClickLogin() {
    if (!loginForm.userName) {
      setError(prevSate => {
        const temp = JSON.parse(JSON.stringify(prevSate));
        temp.userName = true;
        return temp;
      });
      return;
    }
    localStorage.setItem('Name', loginForm.userName);
    if (!loginForm.password) {
      setError(prevSate => {
        const temp = JSON.parse(JSON.stringify(prevSate));
        temp.password = true;
        return temp;
        // return { ...prevSate, password: true };
      });
      // setError(prevState => ({ ...prevState, password: true }));
      return;
    }
    if (localStorage.getItem('Name').length > 0) {
      navigate("/homepage", { replace: false, state: { name: localStorage.getItem('Name') } })
    }

  }

  const onChange = data => {

    const name = data.name;
    const value = data.value;

    setLoginForm(prevSate => {
      const temp = JSON.parse(JSON.stringify(prevSate));
      temp[name] = value;
      return temp;
    });
    setError(prevSate => {
      const temp = JSON.parse(JSON.stringify(prevSate));
      temp[name] = value ? false : true;
      return temp;
    });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"
          placeholder="Enter email"
          onChange={(event) => onChange({ name: 'userName', value: event.target.value })}
          value={loginForm.userName} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        {error.userName && <span style={{ color: 'red' }}>User name is required</span>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
          placeholder="Password"
          onChange={(event) => onChange({ name: 'password', value: event.target.value })}
          value={loginForm.password} />
        {error.password && <span style={{ color: 'red' }}>Password is required</span>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={() => handleClickLogin()}>
        Submit
      </Button>
    </Form>
  );
}

function Page() {
  return(
    <div>LoginPage</div>
  )
}

export default Login;