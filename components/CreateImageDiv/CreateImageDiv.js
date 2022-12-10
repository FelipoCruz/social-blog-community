import './style.css';
import 'firebase/compat/firestore';

import firebase from 'firebase/compat/app';
import { increment, collection, addDoc } from "firebase/firestore"; 

import { useState } from 'react'
import { firestore } from '../../services/fireBaseInit'
import { openAIGeneration } from '../../services/generateOpAI'
import { upload2Cloudinary } from '../../services/upload2Cloudinary'
import Spinner from '../Spinner/Spinner'
import Timer from '../Timer/Timer';

function CreateImage({fetchImages, contests, user}) {
  const [spinner, setSpinner] = useState(true);
  
  // THIS FUNCTION GENERATES EACH IMAGE
  const generateImage = async (event) => {
    event.preventDefault();

    // CHECKS: IF PROMPT CONTAINS THE 2 REQUIRED WORDS
    if (event.target.newPrompt.value.toLowerCase().includes(contests[0].random2Words[0].toLowerCase()) && event.target.newPrompt.value.toLowerCase().includes(contests[0].random2Words[1].toLowerCase())) {
      setSpinner(false);

    // GETS IMAGE´S OPENAI URL, THEN UPLOAD IMAGE TO CLOUDINARY
    let openAIURL = await openAIGeneration(event.target.newPrompt.value.toLowerCase())
    let cloudinaryImgData = await upload2Cloudinary(openAIURL);
    
    // UPLOADS: IMAGE AND IMAGE INFO TO FIREBASE
    const docRef = await addDoc(collection(firestore, 'images'), {
      usedPrompt: event.target.newPrompt.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      url: cloudinaryImgData.secure_url,
      data: cloudinaryImgData,
      userName: user.displayName,
      userId: user.uid,
      contestIdRef: contests[0].id,
      contestWord1: contests[0].random2Words[0],
      contestWord2: contests[0].random2Words[1],
      likesReceived: 0,
      usersWhoLiked: [],
    })

    // ADDS TO THE NEW CREATED IMAGE ITS OWN ID
    const newCreatedImgRef = firestore.collection('images').doc(docRef.id);
    await newCreatedImgRef.update({
      id: docRef.id
    })

    // ADD +1 TO property imagesGenerated at the current contest
    const contestRef = firestore.collection('contests').doc(contests[0].id);
    await contestRef.update({
      imagesGenerated: increment(1)
    })

    event.target.reset();
    setSpinner(true);
  } else {
    alert('you prompt does not include the 2 words')
  }
  };

  return (
    <>   
    { (!contests.length || !spinner)  ? <Spinner /> : 
      <div className='promptInput'>
        <div className='card2'>
          <div className='container2'>
            <div className='card3'>
              <div className='timerDiv'>
                <h1>This contest will end in: <Timer expirationDate={ contests.length ? contests[0].expirationDate : 0} ></Timer> </h1>
              </div>
              <div className='word3Container'>
                <div className='word1'>{ contests.length ? contests[0].random2Words[0] : '' }</div>
                <div className='word2'>{ contests.length ? contests[0].random2Words[1] : '' }</div>
              </div>            
          </div>
          </div>
          <form className='promptForm' onSubmit={generateImage}>
            <input name='newPrompt' placeholder='Write your prompt. Be creative.' type="text" required></input>
            <button>Create Image</button>
          </form>
        </div>
      </div>
      }
    </>

  )
}
export default CreateImage;
