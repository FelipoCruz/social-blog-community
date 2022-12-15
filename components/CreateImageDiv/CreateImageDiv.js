import { useState } from 'react'
import { useContext } from 'react';
import {  ContestsContext, UserContext } from '../../lib/context';
import Spinner from '../Spinner/Spinner'
import Timer from '../Timer/Timer';
import React from 'react';
import Popup from 'reactjs-popup';

function CreateImage() {
  const contests = useContext(ContestsContext);
  const user = useContext(UserContext);
  const [spinner, setSpinner] = useState(true);
  const [popup, setPopup] = useState(false);
  const [image2, setImage2] = useState();
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const postToOpenAI2 = async (prompt) => {
    console.log(prompt);
    const event = {
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      user: user,
      contests: contests
    }
    try {
      const result = await fetch("/api/generateOpAI", 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      })
      console.log(result);
      return await result.json();
    } catch (error) {
      console.log("Error in addEvent on client service", error)
    }
  }

  let image = '';

  const generateImage = async (event) => {
    event.preventDefault();

    // CHECKS: IF PROMPT CONTAINS THE 2 REQUIRED WORDS
    if (event.target.newPrompt.value.toLowerCase().includes(contests[0].random2Words[0].toLowerCase()) && event.target.newPrompt.value.toLowerCase().includes(contests[0].random2Words[1].toLowerCase())) {
      let prompt = event.target.newPrompt.value.toLowerCase()
      setSpinner(false);
      let openAIURL = await postToOpenAI2(prompt)
      console.log(openAIURL);
      image = openAIURL
      setImage2(image);
      console.log(image2)
      setPopup(true);
      console.log(popup)
      console.log(image);
      setOpen(true);

      // GETS IMAGE´S OPENAI URL, THEN UPLOAD IMAGE TO CLOUDINARY
      const cloudinaryImgData = async () => {}
      event.target.reset();
      setSpinner(true);
      } else {
        alert('you prompt does not include the 2 words')
      }
  };

  return (
    <>
      <div>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="overlay">
            {image2 ? <img className='popupImg' src={image2} ></img> : <Spinner />}
          </div>
        </Popup>
      </div>
    { (!contests || !spinner)  ? <Spinner /> : 
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
        {image2 ?
        <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        See Image Again
        </button> :
        null }
      </div>
      }
    </>

  )
}
export default CreateImage;
