import firebase from 'firebase/compat/app';
import { firestore } from '../lib/firebase'
import { collection, addDoc } from 'firebase/firestore';

export const createNewContest1 = async (props) => {

  const fetch2RandWords = async () => {
  const response = await fetch('/api/randomWordAPI');
  let data = await response.json();
  data = data.flat();
  return data;
  }

  const words = await fetch2RandWords();
  console.log(words);

  // CREATES A NEW CONTEST IN FIRESTORE
  const docRef = await addDoc(collection(firestore, 'contests'), {
    random2Words: words,
    expirationDate: firebase.firestore.Timestamp.now().toMillis() + 60000*60*8,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    imagesGenerated: 0
  })

  // ADD THE PROPERTY ID AND ITS VALUE TO THE JUST CREATED CONTEST
  const newCreatedDocRef = firestore.collection('contests').doc(docRef.id);
  await newCreatedDocRef.update({
    id: docRef.id
  })
}