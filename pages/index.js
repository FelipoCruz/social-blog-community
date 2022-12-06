import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import indexBG from '../public/indexbg.png'
import Image from 'next/image';

export default function Home() {
  const user = useContext(UserContext)
  return (
    <main>
      {user ? 
        <>
        {/* If user signed in */}          
        </>      
        :
        <>
        {/* If user signed Out */}
          <div className="bgdiv">

          <div alt="indexbg" className='indexbg' >
            <h1 className='h1WC'> 
            Contend for victory creating <br></br> the coolest AI-based images you can.
            </h1>
            <SignInUpButton>Sign In / Sign Up</SignInUpButton>
          </ div>
          </div>
        </>   
      }
    </main>
  );
}

function SignInUpButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <>
    <button className="signInUpButton" onClick={signInWithGoogle}>Sign In / Sign up</button>
    </>
  )
}
