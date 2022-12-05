import React from 'react';
import logo from '../public/trinity.png';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../lib/context';


export default function Navbar(){
  const user = useContext(UserContext);
  user ? console.log(user) : console.log('no user yet')
  

  return (
    <div className="navbar">
      <Image className="navbar_logo" src={logo} alt="trinity logo" />
      <h1 className='trinityTitle' >Trinity.Ai</h1>
      <img width={30} height={30} className="navbarProfilePic" src={user?.photoURL || '/hacker.png' } />
      
      
    </div>
);

}



