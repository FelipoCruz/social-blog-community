import { useState } from 'react'


function Contest() {

  const [ words, setWords ] = useState([])
  const fetch2RandWords = async () => {
    const response = await fetch('/api/randomWordAPI')
    const data = await response.json()
    setWords(data)
  }

  return (
    <>
    <button onClick={fetch2RandWords}>Load Words</button>

    {<h1 className='h1WC'>{words[0]?.character}</h1>}
    {<h1 className='h1WC'>{words[1]?.salt}</h1>}
    
    </>
  )


}

export default Contest;