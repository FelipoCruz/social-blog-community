import { useState } from 'react'
import { useContext } from 'react';
import { UserContext, ContestsContext, ImagesContext, TestContext } from '../lib/context';


function TestPage() {
  const testContext = useContext(TestContext);
  const contests = useContext(ContestsContext);
  console.log(testContext);
  console.log(contests);



}

export default TestPage;