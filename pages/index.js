import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { useContext } from 'react';
import { UserContext, ContestsContext, ImagesContext } from '../lib/context';


// components:
import ImageFeed from '../components/ImageFeed/ImageFeed';

export default function Home() {
  const user = useContext(UserContext);
  const contests = useContext(ContestsContext);
  const images2 = useContext(ImagesContext);

  return (
    <main>
      {user ? 
        <>
        {/* If user signed in */}  
        <div className="normalDiv">
        </div>
        <h1 className="h1WC"> Trinity Feed </h1>
        {contests && contests.map((contest)=>(
          <ImageFeed key={contest.id} contest={contest} images={images2}>
          </ImageFeed>
        ))
        }


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
