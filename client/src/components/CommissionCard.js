import React from 'react'
import { Link } from 'react-router-dom'

const CommissionCard = (props) => {
  const  { card } = props
  
  return(
    <div className='work-profile-cards'>  
      <Link to={'/commissions/detail/'+card.id} className='cards' key={card.id}>
        <div className='title-work'>
          <h6 style={{ textAlign: 'center'}}>{card.title}</h6>
        </div>
        <img className='img-card' alt={card.id} src={card.image_url} />
      </Link>
    </div>
  )
}

export default CommissionCard