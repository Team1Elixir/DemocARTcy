import React,{ useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import '../assets/navbar.css'

const Navbar = () => {
  const [color, setColor] = useState('');
  const location = useLocation()
  const username = 'yuumeiART'
  useEffect(()=> {
    if(location.pathname === '/profile/'+{username}) {
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
        <Dropdown.Toggle className='dropdown-button'>My Account</Dropdown.Toggle>
          <Dropdown.Menu className='menu-drop d-flex flex-column'>
              <img className='dropdown-userimg' src='https://fc02.deviantart.net/fs71/f/2013/068/9/0/connection_by_yuumei-d5xh09x.jpg' alt='user pic'/>
              <Link className='link-user' to={'/profile/'+username}><h6>Yuumei Art</h6></Link>
              <Link className='link-username' to={'/profile'+username}>@yuumeiART</Link>
              <Dropdown.Header className='dropdown-border'>Account</Dropdown.Header>
              <Link className='link-drop' to={'/profile/'+username}>Profile</Link>
              <Link className='link-drop' to={'/profile/'+username}>Ballance</Link>
              <Dropdown.Header>Commission</Dropdown.Header>
              <Link className='link-drop' to='/'>My Works</Link>
              <Link className='link-drop' to='/'>Commissions</Link>
              <Dropdown.Header>About Democartcy</Dropdown.Header>
              <Link className='link-drop' to='/'>About Us</Link>
              <Link className='link-drop' to='/'>Twitter</Link>
          </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Navbar;
