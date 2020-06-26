import React,{ useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import '../assets/navbar.css'

const Navbar = () => {
  const [color, setColor] = useState('');
  const location = useLocation()
  useEffect(()=> {
    if(location.pathname === '/profile') {
      setColor('#73CDD1')
    } else if(location.pathname === '/'){
      setColor('')
    } else {
      setColor('darkslategrey')
    }
  },[location.pathname])
  return (
    <div style={{background: color}} className='navbar navbar-light d-flex justify-content-between fixed-top'>
      <div>
        <Link className='navbrand' to='/' >DEMOCARTCY</Link>
      </div>
      <div className='nav-item d-flex justify-content-center'>
        <Link className='nav-link' to='/'>HOME</Link>
        <Link className='nav-link' to='/works'>WORKS</Link>
        <Link className='nav-link' to='/commissions'>COMMISSIONS</Link>
      </div>
      <Dropdown>
        <Dropdown.Toggle variant='secondary'>My Account</Dropdown.Toggle>
          <Dropdown.Menu className='menu-drop d-flex flex-column'>
            <div className='link-drop'>
              <Link className='drop-link' to='/profile'>My Profile</Link>
            </div>
            <div className='link-drop'>
              <Link className='drop-link' to='/'>My Works</Link>
            </div>
            <div className='link-drop'>
              <Link className='drop-link' to='/'>Commissions</Link>
            </div>
          </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Navbar;
