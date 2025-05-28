import React from 'react'
import noresult from '../images/no-result.svg'
const NoData = () => {
  return (
    <>
    <img src={noresult} alt=""  className='weather-icon'/>
        <p className='location'>Something Wrong</p>
        <span style={{color: 'red',fontSize:'20px'}}>unable to retrieve the weather details.</span>
        </>
  )
}

export default NoData