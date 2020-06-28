import server from '../../api';
import Axios from 'axios';

export const FETCH_USERDATA = 'FETCH_USERDATA'
export const FETCH_WORKSDATA = 'FETCH_WORKSDATA'
export const FETCH_WORKS = 'FETCH_WORKS'
export const FETCH_WORKDETAIL = 'FETCH_WORKDETAIL'
export const FETCH_PROFILEDATA = 'FETCH_PROFILEDATA'
export const LOADING = 'LOADING'
export const ERROR = 'ERROR'

export const fetchWorkDetail = (data) => {
  return {
    type: FETCH_WORKDETAIL,
    payload: data
  }
}

export const fetchUserData = (data) => {
  return {
    type: FETCH_USERDATA,
    payload: data
  }
}

export const fetchWorksData = (data) => {
  return {
    type: FETCH_WORKSDATA,
    payload: data
  }
}

export const fetchWorks = (data) => {
  return {
    type: FETCH_WORKS,
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
    server.get('/users/'+username)
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
    server.get('/users/'+username)
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

export const getAllWorks = () => {
  return (dispatch) => {
    dispatch(loading(true))
    server.get('/works/all')
    .then(({data}) => {
      dispatch(fetchWorks(data))
    })
    .catch(err => {
      dispatch(error(err))
    })
    .finally(() => {
      dispatch(loading(false))
    })
  }
}

export const getWorkDetail = (id) => {
  return (dispatch) => {
    server.get('/works/'+id)
    .then(({data}) => {
      console.log(data)
      dispatch(fetchWorkDetail(data))
    })
    .catch(err => {
      dispatch(error(err))
    })
    .finally(() => {
      dispatch(loading(false))
    })
  }
}

export const getWorksData = () => {
  return (dispatch) => {
    console.log('getting works data')
    dispatch(loading(true))
    server.get('/works',{ headers: {token: localStorage.token}})
    .then(({data}) => {
      console.log('works data:' , data)
      dispatch(fetchWorksData(data))
    })
    .catch(err => {
      dispatch(error(err))
    })
    .finally(() => {
      dispatch(loading(false))
    })
  }
}