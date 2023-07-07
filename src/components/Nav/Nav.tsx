import React from 'react';
import './index.scss';



function Nav() {
  return(  <nav className="nav">
        <ul>
          <li className="nav__item"><a href="#" className="nav__link">Profile</a> </li>
          <li className="nav__item"><a href="#" className="nav__link">Messages</a></li>
          <li className="nav__item"><a href="#" className="nav__link">News</a></li>
          <li className="nav__item"><a href="#" className="nav__link">Music</a></li>
          <li className="nav__item"><a href="#" className="nav__link">Settings</a></li>
        </ul>
      </nav> ) 
}

export default Nav;