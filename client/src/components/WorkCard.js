import React from 'react'
import { Link } from 'react-router-dom'
const WorkCard = (props) => {
  const  { card } = props
  return(
    <div className='work-profile-cards'>
      <Link to={'/works/detail/'+card.id} className='cards' key={card.id}>
        <h6 className='title-work' style={{ textAlign: 'center'}}>{card.title}</h6>
        <img className='img-card' alt={card.id} src={card.image_url} />
      </Link>
      </div>
  )
}

export default WorkCard