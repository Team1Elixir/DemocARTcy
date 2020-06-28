import { FETCH_USERDATA, FETCH_PROFILEDATA, FETCH_WORKSDATA, LOADING, ERROR, FETCH_WORKS, FETCH_WORKDETAIL } from '../actions'

const initialState = {
  user: {},
  profiledata:{},
  worksdata: [],
  allworks: [],
  workdetail: {},
  loading: false,
  error: []
}

const reducers = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case FETCH_USERDATA : return { ...state, user: payload }
    case FETCH_WORKSDATA : return { ...state, worksdata: payload }
    case FETCH_WORKS : return { ...state, allworks: payload }
    case FETCH_WORKDETAIL : return { ...state, workdetail: payload }
    case FETCH_PROFILEDATA : return { ...state, profiledata: payload }
    case LOADING : return { ...state, loading: payload  }
    case ERROR : return { ...state, error: payload  }
    default : {
      console.log(state)
      return state
      }
  }
}

export default reducers