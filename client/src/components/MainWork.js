import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import Card from './Card'

const MainWork = () => {

  const [data, setData] = useState([])

  useEffect(() => {
   
      Axios.get('http://localhost:3000/works/',{
        headers:{
          token: localStorage.token
        }
      })
      .then(({data}) => {
        console.log('load works',data)
        setData(data.works)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    
    }, [])

  return (
    <div class="d-flex flex-wrap">
      {
          // JSON.stringify(data)
        data.map((card) => {
          return <Card cardData={card}/>
        })
      }
    </div>
  );
}

export default MainWork;
