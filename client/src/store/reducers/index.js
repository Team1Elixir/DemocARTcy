import { 
  FETCH_USERDATA, 
  FETCH_PROFILEDATA, 
  FETCH_WORK_DETAIL,
  FETCH_COMMISSION_DETAIL,
  FETCH_WORKS,
  FETCH_COMMISSIONS,
  LOADING, 
  ERROR } from '../actions'

const initialState = {
  user: {},
  profiledata:{},
  works: [],
  commissions: [],
  work: { User: {} },
  commission: { User: {} },
  loading: false,
  error: []
}

const reducers = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case FETCH_USERDATA : return { ...state, user: payload }
    case FETCH_PROFILEDATA : return { ...state, profiledata: payload }
    case FETCH_WORKS : return { ...state, works: payload }
    case FETCH_COMMISSIONS : return { ...state, commissions: payload }
    case FETCH_WORK_DETAIL : return { ...state, work: payload }
    case FETCH_COMMISSION_DETAIL : return { ...state, commission: payload }
    case LOADING : return { ...state, loading: payload  }
    case ERROR : return { ...state, error: payload  }
    default : {
      console.log(state)
      return state
      }
  }
}

export default reducers