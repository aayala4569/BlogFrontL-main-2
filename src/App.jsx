import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import Dashboard from "./components/Dashboard";
import BlogPage from "./components/BlogPage";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (

    <BrowserRouter>
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Our Blog</h1>
        </Col>
        <NavBar/>
        {/* <Login/> */}
        {/* <CreateAccount/> */}
        {/* <BlogPage/> */}
        {/* <Dashboard /> */}

        <Routes>

          <Route path="/" element={<BlogPage/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/CreateAccount" element={<CreateAccount/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>

        </Routes>



      </Row>
    </Container>
    
    
    </BrowserRouter>
  );
}

export default App;
