import React, { useEffect } from 'react';
import './DetailWork.css';
import { useParams, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getWorkDetail,deleteData } from '../store/actions'
import Loader from 'react-loader-spinner';
import Swal from 'sweetalert2';

const DetailWork = () => {
  const { id } = useParams();
  const work = useSelector((state) => state.work)
  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(getWorkDetail(+id))
  }, [dispatch, id]);

const deleteHandler = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteData('work', id))
        .then(() => {
          history.push('/works')
        })
      }
    })
  }

  if(loading) return (<div style={{ marginTop: 300, textAlign: 'center' }}> <Loader/> </div>)

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mb-3" style={{ marginTop: 75 }}>
      <div className="w-100 row">
        <div className="col-6 d-flex justify-content-center align-items-center work-image-container">
          <img
            src={work.image_url}
            alt={work.title}
            width="100%"
            className="work-image"
          ></img>
        </div>
        <div className="col-6 d-flex flex-column justify-content-start w-100 work-desc p-5 align-items-center">
          <p className="work-creator mb-5">
            Creator: <Link to={'/profile/'+work.User.username}>
              <span className="creator-name">{work.User.username}</span>
            </Link>
          </p>
          <p className="work-title mb-5 text-center">{work.title}</p>
          <p className="work-story mb-5 text-center">{work.description}</p>
          <h4 className="work-category mb-5">
            Category : <span class="badge badge-info p-2 work-category">{work.category}</span>
          </h4>
          <p className="work-disclaimer text-center">
            If you love this work, visit the creator page and apply for his/her commission (if any) to support them.
          </p>
          {
            work.User.username === localStorage.username &&
            <div className='d-flex justify-content-center'>
              <button onClick={e=> deleteHandler(e)} className='delete-work-button btn btn-danger'>Delete</button>
            </div>
          }
          
        </div>
      </div>
    </div>
  );
}

export default DetailWork;