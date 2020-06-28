import React from 'react'

const WorkCard = (props) => {
  const {worksdata} = props
  return(
    <div className='work-profile-cards'>
          { worksdata.map((card,i) => {
              return (
              <div className='cards' key={i}>
                <div className='title-work'>
                  <h6 style={{ textAlign: 'center'}}>{card.title}</h6>
                </div>
                <img className='img-card' alt={i} src={card.image_url} />
              </div>
              )
            })
          }
      </div>
  )
}

export default WorkCard