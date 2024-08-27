import React from 'react'

const Header = () => {
  return (
    <div className='head'>
        <div className='left'>
            <img src='coin.png' alt='icon' style={{width:"40px",height:"40px"}}/>
            <h1>EvenSplit</h1>
        </div> 

        <div className='right'>
          <img src='profile-user.png' alt='icon' style={{width:"38px",height:"36px",marginRight:"10px"}}/>
          <button className='btn'>Log In</button>
          <button className='btn'>Sign Up</button>

        </div>        
      
    </div>
  )
}

export default Header
