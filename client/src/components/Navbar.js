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
    event.preventDefault();
    localStorage.clear();
    history.push('/login');
  }

  useEffect(()=> {
    if(localStorage.username){
      dispatch(getUserData(username))
    }
    if(location.pathname === '/'){
      setColor('#3FC4DE')
      setFontcolor('white')
    } else  {
      setColor('#3FC4DE')
      setFontcolor('white')
    }
  },[location.pathname])

  if(localStorage.token && user)return (<>
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
        <Dropdown.Toggle style={{ color: fontcolor }} className='dropdown-button btn btn-outline-primary'>My Account</Dropdown.Toggle>
          <Dropdown.Menu className='menu-drop d-flex flex-column'>
              <img className='dropdown-userimg' src={user.profile_url} alt='user pic'/>
              <Link className='link-user' to={'/profile/'+username}><h6>{user.name}</h6></Link>
              <Link className='link-username' to={'/profile/'+username}>@{user.username}</Link>
              <Dropdown.Header className='dropdown-border'>Account</Dropdown.Header>
              <Link className='link-drop' to={'/profile/'+username}>Profile</Link>
              <Link className='link-drop' to={'/progress-client/'}>Client Progress</Link>
              <Link className='link-drop' to={'/progress-artist/'}>Art Progress</Link>
              <Dropdown.Header>My Works</Dropdown.Header>
              <Link className='link-drop' to={'/works/user/'+username}>My Portfolios</Link>
              <Link className='link-drop' to={'/commissions/user/'+username}>Commissions</Link>
              <Dropdown.Header>User Panel</Dropdown.Header>
              <button className='btn btn-danger link-drop' onClick={event => logoutEvent(event)}>Logout</button>
          </Dropdown.Menu>
      </Dropdown>
    </div>
    <div style={{height: 55}}></div>
    </>
  )

  else return(
    <>
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
        <Dropdown.Toggle style={{ color: fontcolor }} className='dropdown-button btn btn-outline-primary'>User</Dropdown.Toggle>
          <Dropdown.Menu className='menu-drop-nologin d-flex flex-column'>
              <Dropdown.Header>User Panel</Dropdown.Header>
              <Link className='link-drop' to='/login'>Login</Link>
              <Link className='link-drop' to='/register'>Register</Link>
          </Dropdown.Menu>
      </Dropdown>
    </div>
    <div style={{height: 55}}></div>
    </>
  )
}

export default Navbar;