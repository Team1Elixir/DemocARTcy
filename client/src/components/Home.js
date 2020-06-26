import React from 'react'
import { Carousel } from 'react-bootstrap'

const Home = () => {
  const slide = [
    {
      id: 1,
      alt: 'First Slide',
      src: 'https://wallpaperaccess.com/full/2413558.jpg',
      text: 'this is an example slide'
    },
    {
      id: 2,
      alt: 'Second Slide',
      src: 'https://wallpaperaccess.com/full/2413558.jpg',
      text: 'this is an example slide'
    }
  ]
  
  return(
    <div>
      <Carousel>
        { slide.map(el => {
          return(
            <Carousel.Item key={el.id}>
              <img
                className="d-block w-100"
                src={el.src}
                alt={el.alt}
              />
              <Carousel.Caption>
                <h3>{el.alt}</h3>
                <p>{el.text}</p>
              </Carousel.Caption>
            </Carousel.Item>
            )
          })
        }
      </Carousel>
    </div>
  )
}

export default Home