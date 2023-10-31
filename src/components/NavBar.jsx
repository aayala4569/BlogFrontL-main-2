import {useState, React} from 'react';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
const NavBar = () => {

  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle(`dark-mode`, isDarkMode)
  };

  const navbarClasses = `d-flex justify-content-center m-5 ${isDarkMode ? 'dark-mode' : 'light-mode'}`;

  return (
    <div>
      <Nav className={navbarClasses}
    // className='d-flex justify-content-center m-5'
    activeKey="/home"
    // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
  >
    <Nav.Item>
      <Nav.Link as={Link} to='/' >Blog Page</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link  as={Link} to='/Dashboard' >Dashboard</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link  as={Link} to='/Login' >Login</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link  as={Link} to='/CreateAccount' >Create Account</Nav.Link>
    </Nav.Item>
    <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
  </Nav>
    </div>
    
  );
};

export default NavBar
