import React,{useState} from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { createAccount } from '../Services/DataService';
import Login from './Login';


const CreateAccount = () => {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    // const handleUser = (e) => setUsername(e.target.value); 
    // const handlePassword = (e) => setPassword(e.target.value); 
    const handleSubmit = () => {
        let userData = {
            Id: 0,
            Username,
            Password
        }
        createAccount(userData);
        console.log(userData);
    } 
  return (
    <div>
      <Container className="containerBox d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Form className="create" style={{ width: '40%', padding: '80px', borderRadius: 5 }}>
        <h1 className='text-center'>Create Account</h1>
      <Form.Group className="mb-3" controlId="Username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username"  onChange={({target}) =>setUsername(target.value)}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={({target}) =>setPassword(target.value)} />
      </Form.Group>
      
      <Button className="" variant="outline-primary" onClick={handleSubmit} >
        Submit
      </Button>
    </Form>
      </Container>
      
    </div>
  )
}

export default CreateAccount
