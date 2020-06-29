import React, { useEffect } from 'react';
import { getAllWorks } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card'

const MainWork = () => {
  const worksdata = useSelector((state) => state.allworks)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWorks())
  }, [dispatch]);

  return (
    <div style={{ marginTop: 100 }}>
      <Card cardData={worksdata} />
    </div>
  );
}

export default MainWork;
