import '../styles/globals.css'

// Contexts
import { UserContext, ContestsContext, ImagesContext, TestContext } from '../lib/context'
// import { useUserData } from '../lib/hooks';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../lib/firebase";
import firebase from 'firebase/compat/app';
import React from 'react';
import { firestore } from '../lib/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';

// components:
import Navbar from '../components/Navbar';
import ImageFeed from '../components/ImageFeed/ImageFeed';

// pages:
import Home from '../pages/index'

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);

  // FETCH OF CONTESTS
  const contestsRef = firestore.collection('contests');
  const queryC = contestsRef.orderBy('createdAt', 'desc')
  const [contests2] = useCollectionData(queryC, { idField: 'id' });

  // FETCH OF IMAGES
  const imagesRef = firestore.collection('images');
  const queryI = imagesRef.orderBy('likesReceived', 'desc')
  const [images2] = useCollectionData(queryI, { idField: 'id' });

  return (
    <>
      <UserContext.Provider value={user}>
        <ContestsContext.Provider value={contests2}>
          <ImagesContext.Provider value={images2}>
            <Navbar></Navbar>
            <Component {...pageProps} />
          </ImagesContext.Provider>
        </ContestsContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default MyApp