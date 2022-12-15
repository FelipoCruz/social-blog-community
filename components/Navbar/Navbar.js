import { auth, googleAuthProvider } from "../../lib/firebase";
import React from 'react';
import logo from '../../public/trinity.png';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import Link from 'next/link'

export default function Navbar(){
  const user = useContext(UserContext);
  
  return (
    <div className="navbar">
      <div className="navBarLeft">
        <Image className="navbar_logo" src={logo} alt="trinity logo" />
        <h1 className='trinityTitle' >Trinity.Ai</h1>
      </div>        
        {user ? 
        <>
          <div className="navBarCenter">
            <Link href="/">
              <img className="likeButton" alt='likeButton' src='/homeIcon.png' />
            </Link>
            <Link href="/current-contest">
              <img className="likeButton" alt='likeButton' src='/play.png' />
            </Link>
          </div>
          <div className="navBarRight">
            <SignOutButton className='signOutButton' />
            <img width={30} height={30} className="navbarProfilePic" src={user?.photoURL || '/hacker.png' } />
          </div>
          
        </>      
        : 
        <div className="navBarRight">
          <SignInButton />
          <img width={30} height={30} className="navbarProfilePic" src={user?.photoURL || '/hacker.png' } />
        </div>}
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