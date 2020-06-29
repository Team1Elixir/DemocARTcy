import React from 'react'
import { Link } from 'react-router-dom'
const CommissionCard = (props) => {
  const  { commissionsdata } = props
  return(
    <div className='work-profile-cards'>
          { commissionsdata.map((card,i) => {
              return (
              <Link to={'/commissions/detail/'+card.id} className='cards' key={i}>
                <div className='title-work'>
                  <h6 style={{ textAlign: 'center'}}>{card.title}</h6>
                </div>
                <img className='img-card' alt={i} src={card.image_url} />
              </Link>
              )
            })
          }
      </div>
  )
}

export default CommissionCard