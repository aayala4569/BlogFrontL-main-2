import { Container, Row, Col, Image } from "react-bootstrap";
import "./App.css";
import Dashboard from "./components/Dashboard";
import BlogPage from "./components/BlogPage";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import image from "../src/Images/BGimage.jpg";

function App() {
  return (

    <BrowserRouter>
    <Container>
      <Container fluid className="hero-container">
        <Col>
          <h1 className="text-center absolute-center custom-font">Style it!</h1>
        </Col>
        <Image fluid src={image} className="BGimage"/>
      </Container>
      <Row>
        
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
    
    <Footer/>
    </BrowserRouter>
  );
};

export default App;
