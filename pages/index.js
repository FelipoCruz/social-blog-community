import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Home() {
  const user = useContext(UserContext)
  return (
    <main>
      {user ? 
      <>
      <h1>{user.displayName}</h1>
      <SignOutButton />
      </>      
      : <SignInButton />}
    </main>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <>
    <button className="btn-signIn" onClick={signInWithGoogle}>Sign In</button>
    </>
  )
}
function SignOutButton() {
  return <button onClick={() => auth.signOut()} >Sign Out</button>
}