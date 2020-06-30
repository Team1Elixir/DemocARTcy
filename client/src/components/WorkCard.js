import React from 'react'
import { Link } from 'react-router-dom'
const WorkCard = (props) => {
  const  { card } = props
  return(
    <div className='work-profile-cards'>
      <Link to={'/works/detail/'+card.id} className='cards' key={card.id}>
        <div>
        <h6 className='title-work' style={{ textAlign: 'center'}}>{card.title}</h6>
        </div>
        <div style={{height: 350, width: 275, borderRadius: 'inherit'}}>
        <img className='img-card' alt={card.id} src={card.image_url} />
        </div>
      </Link>
      </div>
  )
}

export default WorkCard