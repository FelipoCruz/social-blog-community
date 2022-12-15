import { React, useState, useEffect } from 'react'
import heart from '../../public/heart-icon.png'
import { firestore } from '../../lib/firebase'
import { increment, arrayRemove, arrayUnion } from "firebase/firestore"; 
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

export default function LikeButton({image}) {
  const [counter, setCounter] = useState(image.likesReceived || 0);
  const [liked, setLiked] = useState(false);
  const user = useContext(UserContext);

  useEffect(()=> {
    if (image.usersWhoLiked && image.usersWhoLiked.includes(user.uid)) {
      setLiked(true);
    };
  }, [])
  
  //  THIS FUNCTION MANAGES THE LIKES
  const imageRef = firestore.collection('images').doc(`${image.id}`)
  const toggleLike1 = async () =>{
    if (!liked) {
      setLiked(true);
      setCounter(count => count + 1);
      await imageRef.update({
        likesReceived: increment(1),
        usersWhoLiked: arrayUnion(user.uid)
      })

    }
    if (liked) {
      setLiked(false);
      setCounter(count => count - 1);
      await imageRef.update({
        likesReceived: increment(-1),
        usersWhoLiked: arrayRemove(user.uid)
      })
    }
  }

  return (
    <div className="counter">      
      <div className="likeContainer">
        <span className="counterOutput">{counter}</span>
        <img className="likeButton" alt='likeButton' src='/heart-icon.png' onClick={toggleLike1} />
      </div>
    </div>
  );
}