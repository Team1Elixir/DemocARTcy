import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Card (props){
    let {cardData} = props
    let pricetag;
    const [title] = useState(cardData.title)
    const [price] = useState(cardData.price)
    const [description] = useState(cardData.description)

    if (cardData.price){
        pricetag =  <p>Price: {price}</p>
    }

    let history = useHistory()

    function detail(){
        history.push('/register')
    }

    return (
        <div class="card" style={{width: '18rem',margin: 50}}>
        <img src={cardData.image_url} class="card-img-top" alt="loading...." onClick={detail}  style={{width:285, height: 400}}/>
        <div class="card-body">
            <h1 class="card-text">{title}</h1>
            <hr/>
            <p>{description}</p>
            {pricetag}
           
        </div>
        </div>
    )
}