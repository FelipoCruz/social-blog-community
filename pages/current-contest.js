import { useState } from 'react'
import { useContext } from 'react';
import { UserContext, ContestsContext, ImagesContext } from '../lib/context';

// componenets
import Spinner from '../components/Spinner/Spinner'

function CurrentContest() {
  const contests = useContext(ContestsContext);
  const [spinner, setSpinner] = useState(true);
  const [url, setURL ] = useState([])

  const postToOpenAI2 = async () => {
    try {
      const result = await fetch('/api/generateOpAI', 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event.target.newPrompt.value.toLowerCase())
      })
      console.log(result);
      return await result.json();

    } catch (error) {
      console.log('Error in addEvent on client service', error)
    }
  }

  const generateImage = async (event) => {
    event.preventDefault();

    // CHECKS: IF PROMPT CONTAINS THE 2 REQUIRED WORDS
    if (event.target.newPrompt.value.toLowerCase().includes(contests[0].random2Words[0].toLowerCase()) && event.target.newPrompt.value.toLowerCase().includes(contests[0].random2Words[1].toLowerCase())) {
      setSpinner(false);

      let openAIURL = await postToOpenAI2(event.target.newPrompt.value.toLowerCase())

      console.log(openAIURL);

    // GETS IMAGE´S OPENAI URL, THEN UPLOAD IMAGE TO CLOUDINARY

    /* const cloudinaryImgData = async () => {} */



  /*     let openAIURL = await openAIGeneration(event.target.newPrompt.value.toLowerCase())
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
    }) */

    event.target.reset();
    setSpinner(true);
  } else {
    alert('you prompt does not include the 2 words')
  }
  };





  return (
    <>
      <div>
        <h1> 👋 Hi There!</h1>
        <p1> ❤️ To participate in the contest, write a sentence, than includes both of the following words:</p1>
      </div>
      <div className='word3Container'>
          <div className='word1'>{ contests ? contests[0]?.random2Words[0] : <Spinner></Spinner> }</div>
          <div className='word2'>{ contests ? contests[0]?.random2Words[1] :  <Spinner></Spinner>  }</div>
      </div>
      <div>
        <p1> 🚀 The more creative the sentece, the better! </p1>
      </div>
      <div>
        <form className='promptForm' onSubmit={generateImage}>
          <input name='newPrompt' placeholder='Write your prompt. Be creative.' type="text" required></input>
          <button>Create Image</button>
        </form>
      </div>



    </>
  )


}

export default CurrentContest;