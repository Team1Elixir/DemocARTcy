import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getProfileWorks, getProfileCommissions } from '../store/actions'
import WorkCard from './WorkCard'
import CommissionCard from './CommissionCard'

const ProfileWork = (props) => {
  
  const dispatch = useDispatch()
  const { id } = props
  const commissions = useSelector(state => state.commissions)
  const works = useSelector(state => state.works)

  useEffect(() => {

    dispatch(getProfileCommissions(id))
    dispatch(getProfileWorks(id))

  },[localStorage.profileId])

  return(
    <div className='user-profile-cards-container'>
      <div className='work-card-container'>
        { works.map(card=> {
            return <WorkCard card={card} />
          })
        }
      </div>
    </div>
  )
}

export default ProfileWork