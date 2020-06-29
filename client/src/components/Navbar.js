import React,{ useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import '../assets/navbar.css'
import { getUserData } from '../store/actions'

const Navbar = () => {
  const [color, setColor] = useState('');
  const [fontcolor, setFontcolor] = useState('black')
  const location = useLocation()
  const history = useHistory()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const username = localStorage.username

  const logoutEvent = (event) => {
    event.preventDefault()
    localStorage.clear()
    history.push('/login')
  }

  useEffect(()=> {
    if(localStorage.username){
      dispatch(getUserData(username))
    }
    if(location.pathname === '/'){
      setColor('')
      setFontcolor('#014638')
    } else if(location.pathname === '/works' || location.pathname === '/commissions') {
      setColor('darkslategrey')
      setFontcolor('white')
    }  else if(location.pathname === '/login' || location.pathname === '/register'){
      setColor('darkslategrey')
      setFontcolor('white')
    }
     else {
      setColor('#73CDD1')
      setFontcolor('white')
    }
  },[location.pathname])

  if(localStorage.token && user)return (
    <div style={{background: color}} className='navbar navbar-light d-flex justify-content-between fixed-top'>
      <div>
        <Link style={{ color: fontcolor }} className='navbrand' to='/' >DEMOCARTCY</Link>
      </div>
      <div className='nav-item d-flex justify-content-center'>
        <Link style={{ color: fontcolor }} className='nav-link' to='/'>HOME</Link>
        <Link style={{ color: fontcolor }} className='nav-link' to='/works'>PORTFOLIOS</Link>
        <Link style={{ color: fontcolor }} className='nav-link' to='/commissions'>COMMISSIONS</Link>
      </div>
      <Dropdown>
        <Dropdown.Toggle style={{ color: fontcolor }} className='dropdown-button btn btn-outline-secondary'>My Account</Dropdown.Toggle>
          <Dropdown.Menu className='menu-drop d-flex flex-column'>
              <img className='dropdown-userimg' src={user.profile_url} alt='user pic'/>
              <Link className='link-user' to={'/profile/'+username}><h6>{user.name}</h6></Link>
              <Link className='link-username' to={'/profile/'+username}>@{user.username}</Link>
              <Dropdown.Header className='dropdown-border'>Account</Dropdown.Header>
              <Link className='link-drop' to={'/profile/'+username}>Profile</Link>
              <Dropdown.Header>Commission</Dropdown.Header>
              <Link className='link-drop' to={'/works/user/'+username}>My Portfolio</Link>
              <Link className='link-drop' to={'/commissions/user/'+username}>Commissions</Link>
              <Dropdown.Header>About Democartcy</Dropdown.Header>
              <Link className='link-drop' to='/'>About Us</Link>
              <button className='btn btn-danger link-drop' onClick={event => logoutEvent(event)}>Logout</button>
          </Dropdown.Menu>
      </Dropdown>
    </div>
  )

  else return(
    <div style={{background: color}} className='navbar navbar-light d-flex justify-content-between fixed-top'>
      <div>
        <Link style={{ color: fontcolor }} className='navbrand' to='/' >DEMOCARTCY</Link>
      </div>
      <div className='nav-item d-flex justify-content-center'>
        <Link style={{ color: fontcolor }} className='nav-link' to='/'>HOME</Link>
        <Link style={{ color: fontcolor }} className='nav-link' to='/works'>PORTFOLIOS</Link>
        <Link style={{ color: fontcolor }} className='nav-link' to='/commissions'>COMMISSIONS</Link>
      </div>
      <Dropdown>
        <Dropdown.Toggle className='dropdown-button'>User</Dropdown.Toggle>
          <Dropdown.Menu className='menu-drop-nologin d-flex flex-column'>
              <Dropdown.Header>User Panel</Dropdown.Header>
              <Link className='link-drop' to='/login'>Login</Link>
              <Link className='link-drop' to='/register'>Register</Link>
              <Dropdown.Header>About Democartcy</Dropdown.Header>
              <Link className='link-drop' to='/'>About Us</Link>
          </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Navbar;