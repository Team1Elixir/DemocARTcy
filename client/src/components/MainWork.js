import React from 'react';

const MainWork = () => {

  const dummycards = [
    { img: 'https://pm1.narvii.com/6505/21c144ad58b67039ab42ffed896c7c21f75c888c_hq.jpg' },
    { img: 'https://img.wethrift.com/yuumei-art.jpg'},
    { img: 'https://4.bp.blogspot.com/-Srvde-da9sc/UJiDbgmPLeI/AAAAAAAAANM/9CZGLWIwBMA/s1600/guilty-by-yuumei.jpg'}]

  return (
    <div style={{ marginTop: 100 }}>
      <div className='work-profile-cards'>
          { dummycards.map((card,i) => {
              return (
              <div className='cards'>
                <img className='img-card' alt={i} src={card.img} />
              </div>
              )
            })
          }
        </div>
    </div>
  );
}

export default MainWork;
