import '../styles/globals.css'
import { UserContext } from '../lib/context'
// import { useUserData } from '../lib/hooks';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../lib/firebase";

// components

import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);


  return (
    <UserContext.Provider value={user}>
      <Navbar></Navbar>



      <Component {...pageProps} />

    </UserContext.Provider>


  )
}

export default MyApp