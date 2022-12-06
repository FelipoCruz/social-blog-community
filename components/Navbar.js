import { auth, googleAuthProvider } from "../lib/firebase";
import React from 'react';
import logo from '../public/trinity.png';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../lib/context';


export default function Navbar(){
  const user = useContext(UserContext);
  

  return (
    <div className="navbar">
      <Image className="navbar_logo" src={logo} alt="trinity logo" />
      <h1 className='trinityTitle' >Trinity.Ai</h1>
      <div className='navbarRightDiv'>
        {user ? 
        <>
          <SignOutButton className='signOutButton' />
        </>      
        : <SignInButton />}
        <img width={30} height={30} className="navbarProfilePic" src={user?.photoURL || '/hacker.png' } />
      </div>
    </div>
);

}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <>
    <button className="signInOutButton" onClick={signInWithGoogle}>Sign In</button>
    </>
  )
}

function SignOutButton() {
  return <button className='signInOutButton' onClick={() => auth.signOut()} >Sign Out</button>
}



