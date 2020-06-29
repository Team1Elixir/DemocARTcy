import React, { useEffect } from 'react';
import { getAllWorks } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import WorkCard from './WorkCard'

const MainWork = () => {

  const works = useSelector((state) => state.works)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllWorks())
  }, []);

  if(loading) return (<div style={{ marginTop: 100, textAlign: 'center' }}><h3>Loading.....</h3></div>)
  if(loading) return (<div style={{ marginTop: 100, textAlign: 'center' }}><h3>Error.....</h3></div>)
  return (
    <div style={{ marginTop: 100 }}>
      <WorkCard worksdata={works} />
    </div>
  )
}

export default MainWork;