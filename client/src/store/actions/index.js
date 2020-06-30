import server from '../../api';
import { toast } from 'react-toastify';

toast.configure();
export const FETCH_USERDATA = 'FETCH_USERDATA'
export const FETCH_PROFILEDATA = 'FETCH_PROFILEDATA'
export const FETCH_WORKS = 'FETCH_WORKS'
export const FETCH_COMMISSIONS = 'FETCH_COMMISSIONS'
export const FETCH_WORK_DETAIL = 'FETCH_WORK_DETAIL'
export const FETCH_COMMISSION_DETAIL = 'FETCH_COMMISSION_DETAIL'
export const FETCH_PROGRESSCLIENT = 'FETCH_PROGRESSCLIENT'
export const FETCH_PROGRESSARTIST = 'FETCH_PROGRESSARTIST'
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

export const fetchWorkDetail = (data) => {
  return {
    type: FETCH_WORK_DETAIL,
    payload: data
  }
}

export const fetchCommissionDetail = (data) => {
  return {
    type: FETCH_COMMISSION_DETAIL,
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

export const fetchUserWorks = (data) => {
  return {
    type: FETCH_WORKS,
    payload: data
  }
}

export const fetchUserCommissions = (data) => {
  return {
    type: FETCH_COMMISSIONS,
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

export const fetchProgressClient = (data) => {
  return {
    type: FETCH_PROGRESSCLIENT,
    payload: data
  }
}

export const fetchProgressArtist = (data) => {
  return {
    type: FETCH_PROGRESSARTIST,
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
      dispatch(error(err.response.data.error))
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
      console.log(data)
      dispatch(fetchProfileData(data))
      localStorage.setItem('profileId', data.id)
    })
    .catch(err => {
      dispatch(error(err.response.data.error))
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
      console.log(data.works)
      dispatch(fetchWorks(data.works))
    })
    .catch(err => {
      dispatch(error(err.response.data.error))
    })
    .finally(() => {
      dispatch(loading(false))
    })
  }
}

export const getAllCommissions = () => {
  return (dispatch) => {
    dispatch(loading(true))
    server.get('/commissions/all')
    .then(({data}) => {
      console.log(data.commissions)
      dispatch(fetchCommissions(data.commissions))
    })
    .catch(err => dispatch(error(err.response.data.error)))
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
      dispatch(fetchWorkDetail(data.work))
    })
    .catch(err => {
      dispatch(error(err.response.data.error))
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
      console.log(data);
      dispatch(fetchCommissionDetail(data.commission))
    })
    .catch(err => {
      dispatch(error(err.response.data.error))
    })
    .finally(() => {
      dispatch(loading(false))
    })
  }
}

export const getUserWorks = () => {
  return (dispatch) => {
    dispatch(loading(true))
    server({method: 'GET', url: '/works', headers: {token: localStorage.token }})
    .then(({data}) => {
      dispatch(fetchWorks(data.works))
    })
    .catch(err => dispatch(error(err.response.data.error)))
    .finally(() => dispatch(loading(false)))
  }
}

export const getUserCommissions = () => {
  return (dispatch) => {
    dispatch(loading(true))
    server({method: 'GET', url: '/commissions', headers: {token: localStorage.token }})
    .then(({data}) => {
      dispatch(fetchCommissions(data.commissions))
    })
    .catch(err => dispatch(error(err.response.data.error)))
    .finally(() => dispatch(loading(false)))
  }
}

export const getProfileWorks = (id) => {
  return (dispatch) => {
    dispatch(loading(true))
    server.get('/works/user/'+id)
    .then(({data}) => {
      dispatch(fetchUserWorks(data.works))
    })
    .catch(err => dispatch(error(err.response.data.error)))
    .finally(() => dispatch(loading(false)))
  }
}

export const getProfileCommissions = (id) => {
  return (dispatch) => {
    dispatch(loading(true))
    server.get('/commissions/user/'+id)
    .then(({data}) => {
      dispatch(fetchUserCommissions(data.commissions))
    })
    .catch(err => dispatch(error(err.response.data.error)))
    .finally(() => dispatch(loading(false)))
  }
}

export const registerUser = (payload) => {
  return (dispatch) => {
    dispatch(loading(true));
    return server.post('/users/register', payload)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        toast.error(err.response.data.error, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500
        })
        dispatch(error(err));
      })
      .finally(() => {
        dispatch(loading(false));
      })
  }
}

export const loginUser = (payload) => {
  return (dispatch) => {
    dispatch(loading(true));
    return server.post('/users/login', payload)
      .then(({ data }) => {
        console.log(data)
        const { token, username } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
      })
      .catch(err => {
        dispatch(error(err.response.data.error));
      })
      .finally(() => {
        dispatch(loading(false));
      })
  }
}

export const addPortofolio = (payload) => {
  const { token } = localStorage;
  return (dispatch) => {
    dispatch(loading(true));
    return server.post('/works/', payload, {
      headers: {
        token
      }
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err.response.data.error);
        dispatch(error(err.response.data.error));
      })
      .finally(() => {
        dispatch(loading(false));
      })
  }
}

export const addCommission = (payload) => {
  const { token } = localStorage;
  return (dispatch) => {
    dispatch(loading(true));
    return server.post('/commissions/', payload, {
      headers: {
        token
      }
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        dispatch(error(err.response.data.error));
      })
      .finally(() => {
        dispatch(loading(false));
      })
  }
}

export const newProject = (payload) => {
  const { token } = localStorage;
  const { title, price, id } = payload;
  return (dispatch) => {
    dispatch(loading(true))
    return server.post('/progresses/'+id, {
      title,
      price
    }, {
      headers: {
        token
      }
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err.response)
        dispatch(error(err.response.data.error));
      })
      .finally(() => {
        dispatch(loading(false));
      })
  }
}

export const getProgressClient = () => {
  const { token } = localStorage;
  return (dispatch) => {
    dispatch(loading(true))
    server.get('/progresses/client', {
      headers: {
        token
      }
    })
    .then(({ data }) => {
      const { projects } = data;
      console.log(projects)
      dispatch(fetchProgressClient(projects))
    })
    .catch(err => {
      dispatch(error(err));
    })
    .finally(() => {
      dispatch(loading(false));
    })
  }
}

export const getProgressArtist = () => {
  const { token } = localStorage;
  return (dispatch) => {
    dispatch(loading(true));
    server.get('/progresses/artist', {
      headers: {
        token
      }
    })
    .then(({ data }) => {
      const { projects } = data;
      dispatch(fetchProgressArtist(projects))
    })
    .catch(err => {
      dispatch(error(err));
    })
    .finally(() => {
      dispatch(loading(false));
    })
  }
}

export const proceedPayment = payload => {
  const { token } = localStorage;
  return dispatch => {
    dispatch(loading(true));
    server.post('/payment', payload, {
      headers: {
        token
      }
    })
      .then(({ data }) => {
        toast.success(data.success, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500
        })
        dispatch(getProgressClient());
      })
      .catch(err => {
        toast.error(err.response.data.error, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500
        })
        dispatch(error(err));
      })
      .finally(() => {
        dispatch(loading(false));
      })
  }
}

export const editProfile = payload => {
  const { token } = localStorage;
  const { id, data } = payload;
  return (dispatch) => {
    dispatch(loading(true));
    server.put(`/users/${id}`, data, {
      headers: {
        token
      }
    })
      .then(({ data }) => {
        console.log(data);
        dispatch(getProfileData(payload.name))
      })
      .catch(err => {
        toast.error(err.response.data.error, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500
        })
        dispatch(error(err));
      })
      .finally(() => {
        dispatch(loading(false));
      })
  }
}
