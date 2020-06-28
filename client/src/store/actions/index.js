import server from '../../api';
import Axios from 'axios';

export const FETCH_USERDATA = 'FETCH_USERDATA'
export const FETCH_WORKSDATA = 'FETCH_WORKSDATA'
export const FETCH_COMISSIONSDATA = 'FETCH_COMMISSIONSDATA'
export const FETCH_WORKS = 'FETCH_WORKS'
export const FETCH_COMMISSIONS = 'FETCH_COMMISSIONS'
export const FETCH_WORKDETAIL = 'FETCH_WORKDETAIL'
export const FETCH_COMMISSIONDETAIL = 'FETCH_COMMISSIONDETAIL'
export const FETCH_PROFILEDATA = 'FETCH_PROFILEDATA'
export const LOADING = 'LOADING'
export const ERROR = 'ERROR'

export const fetchWorkDetail = (data) => {
  return {
    type: FETCH_WORKDETAIL,
    payload: data
  }
}

export const fetchCommissionDetail = (data) => {
  return {
    type: FETCH_COMMISSIONDETAIL,
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

export const fetchCommissionsData = (data) => {
  return {
    type: FETCH_COMISSIONSDATA,
    payload: data
  }
}

export const fetchWorks = (data) => {
  return {
    type: FETCH_WORKS,
    payload: data
  }
}

export const fetchCommissions = (data) => {
  return {
    type: FETCH_COMMISSIONS,
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

export const getAllCommissions = () => {
  return (dispatch) => {
    dispatch(loading(true))
    console.log('mampir di get all com')
    server.get('/commissions/all')
    .then(({data}) => {
      console.log('dapet')
      dispatch(fetchCommissions(data))
    })
    .catch(err => console.log(err))
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

export const getCommissionDetail = (id) => {
  return (dispatch) => {
    server.get('/commissions/'+id)
    .then(({data}) => {
      console.log(data)
      dispatch(fetchCommissionDetail(data))
    })
    .catch(err => {
      dispatch(error(err))
    })
    .finally(() => {
      dispatch(loading(false))
    })
  }
}

export const getWorksData = (id) => {
  return (dispatch) => {
    console.log('getting works data')
    dispatch(loading(true))
    server.get('/works/user/'+id)
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

export const getCommissionsData = (id) => {
  return (dispatch) => {
    console.log('getting commissions data')
    dispatch(loading(true))
    server.get('/commissions/user/'+id)
    .then(({data}) => {
      console.log('works data:' , data)
      dispatch(fetchCommissionsData(data))
    })
    .catch(err => {
      dispatch(error(err))
    })
    .finally(() => {
      dispatch(loading(false))
    })
  }
}
