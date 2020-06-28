import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

export default function AddWork (){
  const history = useHistory()
  const [title,setTitle] = useState('')
  const [image_url,setImage_url] = useState('')
  const [story,setStory] = useState('')
  const [category,setCategory] = useState('')

  const center= {
    display: 'block',
    marginleft: 'auto',
    marginright: 'auto',
    width: '100%',
    height: '100%',
    maxWidth: 550,
    maxHeight: 150
  }

  function addNew(){
    const data={
      title,
      image_url,
      story,
      category
    }
    console.log(data)

    Axios.post('http://localhost:3000/works/',data,{
      headers: {
        token: localStorage.token
      }
    })
      .then(({data}) => {
        console.log('add work completed')
        history.push('/works/user/'+localStorage.username)
      })
      .catch(console.log)
  }

    return(
        <div class="container ">
      <div class="row justify-content-md-center">
        <div class="col col-lg-3"></div>
        <div class="col-6  ">
            <h1 class="text-center">Add Fortofolio</h1>
            <img src={image_url} style={center}/>
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
              onChange={(event) => setStory(event.target.value)}
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