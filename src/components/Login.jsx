import React,{useState} from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login, GetLoggedInuser  } from '../Services/DataService';


const Login = () => {

    let navigate = useNavigate();

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const handleUser = (e) => setUsername(e.target.value); 
    const handlePassword = (e) => setPassword(e.target.value); 
    const handleSubmit = async () => {
        let userData = {
            username: Username,
            password: Password
        }

        let token = await login(userData)
        console.log(userData);
        if(token.token != null)
        {
          localStorage.setItem("Token", token.token);
          GetLoggedInuser(Username);
          navigate("/Dashboard");
        }
    }; 
  return (
    <div>
      <Container className="loginBox d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Form className="login" style={{ width: '40%', padding: '80px', borderRadius: 5 }}>
        <h1 className='text-center'>Login</h1>
      <Form.Group className="mb-3" controlId="Username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username"  onChange={handleUser}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
      </Form.Group>
      
      <Button variant="outline-primary" onClick={handleSubmit} >
        Submit
      </Button>
      <p className='mt-2'> If you don't have an account</p>
      <Button variant="outline-primary" onClick={()=> navigate("/CreateAccount")}  >
        Create Account
      </Button>
    </Form>
      </Container>
      
    </div>
  )
}

export default Login
