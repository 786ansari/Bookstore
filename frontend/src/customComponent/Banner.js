import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import { imageUrl } from '../services/dataurl';
import SliderLoader from '../utils/loaders/SliderLoader';

export default function Banner(props) {
  
  return (
    <MDBCarousel showControls>
        {props && props.list.length>0 ? 
        props.list.map((poster,index)=>{
          return <MDBCarouselItem
            className='w-100 d-block'
            itemId={index+1}
            src={imageUrl+poster.posterIcon}
            alt='...'
          />
      }):<SliderLoader setting={{width:1500,viewBox:"0 0 1500 460"}}/>
        }
      {/* <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src='https://mdbootstrap.com/img/new/slides/041.jpg'
        alt='...'
      />
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src='https://mdbootstrap.com/img/new/slides/042.jpg'
        alt='...'
      />
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src='https://mdbootstrap.com/img/new/slides/043.jpg'
        alt='...'
      /> */}
    </MDBCarousel>
  );
}