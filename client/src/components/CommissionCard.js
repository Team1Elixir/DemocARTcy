import React from 'react'
import { Link } from 'react-router-dom'

const CommissionCard = (props) => {
  const  { card } = props
  
  return(
    <div className='work-profile-cards'>  
      <Link to={'/commissions/detail/'+card.id} className='cards' key={card.id}>
        <div>
          <h6 className='title-work'>{card.title}</h6>
        </div>
        <div style={{height: 400, width: 300, borderRadius: 'inherit'}}>
        <img className='img-card' alt={card.id} src={card.image_url} />
        </div>
      </Link>
    </div>
  )
}

export default CommissionCard