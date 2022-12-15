import { Configuration, OpenAIApi } from "openai";
import cloudinary from 'cloudinary';
const FormData = require('form-data');

import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { increment, collection, addDoc } from "firebase/firestore"; 
import { firestore } from '../../lib/firebase'

// OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPAIKEY
});
const openai = new  OpenAIApi(configuration);

// handler when POST request is received in this API
let newImageURL = ""
let prompt = ""

export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      const { body } = req;
      console.log("body is", body);
      const finalBody = {
        prompt: body.prompt,
        n: 1,
        size: "1024x1024"
      }
      prompt = body.prompt;
      const user = body.user;
      const contests = body.contests;
      newImageURL = await openAIGeneration(finalBody);
      const cloudinaryImgData = await upload2Cloudinary(newImageURL);
      console.log("cloudinary image data is:", cloudinaryImgData)

      // UPLOADS: IMAGE AND IMAGE INFO TO FIREBASE
      const docRef = await addDoc(collection(firestore, "images"), {
        usedPrompt: prompt,
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

      return res.status(200).json(cloudinaryImgData.secure_url);
    } catch (error) {
      console.log('error in post method at generateOpAI', error)
    }
  }
}

// POST request made to OpenAI, to generate the image
export const openAIGeneration = async (prompt) => {
  console.log(prompt);
  const result = await openai.createImage(prompt);
  const urlOpenAI = result.data.data[0].url;
  return urlOpenAI
};

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CDINARY_cloud_name,
  api_key: process.env.CDINARY_api_key,
  api_secret: process.env.CDINARY_api_secret
});

// Upload image to cloudinary
export const upload2Cloudinary = async (urlFromOpenAIParam) => {
  try {
    const result = await cloudinary.uploader.upload(urlFromOpenAIParam);
    console.log('result of cloudinary upload', result);
    return result;
  } catch (error) {
    console.log('error in cloudinary upload is:', error);
  }
}