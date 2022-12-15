import { randomWordAPI } from './randomWordAPI'
import firebase from 'firebase/compat/app';
import { firestore } from '../../lib/firebase'
import { collection, addDoc } from 'firebase/firestore';

export const createNewContest1 = async (props) => {
    let rand2Words = await randomWordAPI()
    let rand2WordsFlat = rand2Words.flat()

    // CREATES A NEW CONTEST IN FIRESTORE
    const docRef = await addDoc(collection(firestore, 'contests'), {
      random2Words: rand2WordsFlat,
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