import React from 'react'
import { Link } from 'react-router-dom'
const WorkCard = (props) => {
  const  { worksdata } = props
  console.log('worksdata:' ,worksdata)
  return(
    <div className='work-profile-cards'>
          { worksdata.map((card,i) => {
              return (
              <Link to={'/works/detail/'+card.id} className='cards' key={i}>
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

export default WorkCard