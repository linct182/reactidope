import React from 'react';
import styled from 'react-emotion';

import coverImg from '../../assets/img/dashboard_banner.jpg';

const HeaderTitleCover = styled('div')({
  background: `url(${coverImg})`,
  backgroundPosition: 'right top',
  backgroundSize: 'cover',
  position: 'relative',
  height: 150,
  fontFamily: 'Raleway',
  fontWeight: 200,
  fontSize: 30,
  padding: 50,
  color: 'white',
  textAlign: 'center'
});

const HeaderBanner = (props) => {
  return (
    <HeaderTitleCover>{props.title}</HeaderTitleCover>
  )
}
 
export default HeaderBanner;