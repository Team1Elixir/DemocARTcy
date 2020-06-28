import { 
  FETCH_USERDATA, 
  FETCH_PROFILEDATA, 
  LOADING, ERROR, 
  FETCH_WORKS, 
  FETCH_WORKSDATA, 
  FETCH_WORKDETAIL, 
  FETCH_COMMISSIONS,
  FETCH_COMISSIONSDATA,
  FETCH_COMMISSIONDETAIL
} from '../actions'

const initialState = {

  user: {},
  profiledata:{},
  worksdata: [],
  comissionsdata: [],
  allworks: [],
  allcommissions: [],
  workdetail: {},
  commissiondetail: {},
  loading: false,
  error: []

}

const reducers = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case FETCH_USERDATA : return { ...state, user: payload }
    case FETCH_WORKSDATA : return { ...state, worksdata: payload }
    case FETCH_COMISSIONSDATA : return { ...state, commissionsdata: payload }
    case FETCH_WORKS : return { ...state, allworks: payload }
    case FETCH_COMMISSIONS : return { ...state, allcommissions: payload }
    case FETCH_WORKDETAIL : return { ...state, workdetail: payload }
    case FETCH_COMMISSIONDETAIL : return { ...state, commissiondetail: payload }
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