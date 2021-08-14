import React from 'react';
import { Carousel } from 'antd'

const Banner = () => {
  
  const contentStyle = {
    height: '250px',
    width: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  
  return(
    <Carousel autoplay effect='scrollx'>
      <div>
        <img style={contentStyle} src='https://rukminim1.flixcart.com/flap/50/50/image/ac6ec0ece8b084f1.jpg?q=50' alt='img'/>
      </div>
      <div>
        <img style={contentStyle} src='https://rukminim1.flixcart.com/flap/50/50/image/8855b884abdd258b.jpg?q=50' alt='img'/>
      </div>
      <div>
        <img style={contentStyle} src='https://rukminim1.flixcart.com/flap/844/140/image/e4cae5d5c18fd855.jpg?q=50' alt='img'/>
      </div>
    </Carousel>
  );
}

export default Banner;