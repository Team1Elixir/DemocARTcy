import axios from 'axios'

export const FETCH_USERDATA = 'FETCH_USERDATA'
export const FETCH_PROFILEDATA = 'FETCH_PROFILEDATA'
export const LOADING = 'LOADING'
export const ERROR = 'ERROR'

export const fetchUserData = (data) => {
  return {
    type: FETCH_USERDATA,
    payload: data
  }
}

export const fetchProfileData = (data) => {
  return {
    type: FETCH_PROFILEDATA,
    payload: data
  }
}

export const loading = (data) => {
  return {
    type: LOADING,
    payload: data
  }
}

export const error = (data) => {
  return {
    type: ERROR,
    payload: data
  }
}

export const getUserData = (username) => {
  return (dispatch) => {
    console.log('getting user data...')
    dispatch(loading(true))
    axios.get('http://localhost:3000/users/'+username)
    .then(({data}) => {
      dispatch(fetchUserData(data))
    })
    .catch(err => {
      dispatch(error(err))
    })
    .finally(() => {
      dispatch(loading(false))
    })
  }
}

export const getProfileData = (username) => {
  return(dispatch) => {
    console.log('getting user data...')
    dispatch(loading(true))
    axios.get('http://localhost:3000/users/'+username)
    .then(({data}) => {
      dispatch(fetchProfileData(data))
    })
    .catch(err => {
      dispatch(error(err))
    })
    .finally(() => {
      dispatch(loading(false))
    })
  }
}