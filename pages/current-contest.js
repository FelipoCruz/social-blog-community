import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { ContestsContext, UserContext } from '../lib/context';
import CreateImage from '../components/CreateImageDiv/CreateImageDiv'
import React from 'react';
import Popup from 'reactjs-popup';
import { useRouter } from 'next/router'

// componenets
import Spinner from '../components/Spinner/Spinner'
import ReDirect from '../components/ReDirect/ReDirect';

function CurrentContest() {
  const contests = useContext(ContestsContext);
  const user = useContext(UserContext);
  const [spinner, setSpinner] = useState(true);

  return (
    <>
      <ReDirect></ReDirect>
      <div className='normalDiv2'>
        <h1 className='h1WC'> 👋 Hi There!</h1>
        <p className='p1WC'> ❤️ To participate in the contest, write a sentence, than includes both of the following words:</p>
      </div>
      <CreateImage contests={contests || []} user={user}></CreateImage>

    </>
  )


}



export default CurrentContest;