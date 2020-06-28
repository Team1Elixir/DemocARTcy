import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import Card from './Card'

const MainCommission = () => {

  const [data,setData] = useState([])
 

  useEffect(() => {
    Axios.get('http://localhost:3000/commissions/', {
      headers: {
        token: localStorage.token
      }
    })
    .then(({data}) => {
      console.log('load completed', data)
      setData(data.commissions)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
  
  return (
    <div>
      {
          // JSON.stringify(data)
        data.map((card) => {
          return <Card cardData={card}/>
        })
      }
    </div>
  );
}

export default MainCommission;
