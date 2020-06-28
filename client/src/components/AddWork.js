import React, { useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function AddWork (){

  const [title,setTitle] = useState('')
  const [image_url,setImage_url] = useState('')
  const [description,setDescription] = useState('')
  const [category,setCategory] = useState('')

  let history = useHistory()

  const center= {
    display: 'block',
    marginTop: 50,
    marginleft: 'auto',
    marginright: 'auto',
    width: '100%',
    height: '100%',
    maxWidth: 550,
    maxHeight: 900
  }

  function addNew(){
    const data={
      title,
      description,
      image_url,
      category
    }
    console.log(data)

    Axios.post('http://localhost:3000/works/',data,{
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(({data}) => {
        console.log('add work completed')
        history.push('/works')
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

    return(
        <div class="container ">
      <div class="row justify-content-md-center">
        <div class="col col-lg-3">
        <img src={image_url} style={center} class="d-none d-lg-block"/>
        </div>
        <div class="col-6  ">
            <h1 class="text-center" style={{marginTop: 50}}>Add Fortofolio</h1>
              <div class="input-group-prepend"> <span class="input-group-text">Title</span></div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setTitle(event.target.value)}
            />
            
            <div class="input-group-prepend"> <span class="input-group-text">Image Url</span></div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setImage_url(event.target.value)}
            />

            <div class="input-group-prepend"> <span class="input-group-text">Decription</span></div>
            <textarea
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setDescription(event.target.value)}
            />
            <div class="input-group-prepend"> <span class="input-group-text">Category</span></div>
            <select name="category" class="form-control" onChange={(event) => setCategory(event.target.value)}>
              <option defaultChecked>---select---</option>
              <option>2D Art</option>
              <option>3D Art</option>
            </select>
            <button type="button" class="btn btn-primary btn-lg btn-block" onClick={addNew}>
              Add Fortofolio
            </button>
        </div>
        <div class="col col-lg-3"></div>
      </div>
    </div>
    )
}