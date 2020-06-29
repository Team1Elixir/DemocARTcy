import React, { useEffect } from 'react';
import { getAllWorks } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import WorkCard from './WorkCard'

const MainWork = () => {

  const works = useSelector((state) => state.works)
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllWorks())
  }, []);

  return (
    <div style={{ marginTop: 100 }}>
      <WorkCard worksdata={works} />
    </div>
  )
}

export default MainWork;