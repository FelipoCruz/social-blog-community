import ImageCard from '../../components/ImageCard/ImageCard';


function ImageFeed (props) {

  return (
    <>
    { props.contest?.imagesGenerated < 1 ? '' :

      <div className='feedContainer'>
        <div className='word3Container'>
                  <div className='word1'>{ props.contest?.random2Words[0] }</div>
                  <div className='word2'>{ props.contest?.random2Words[1] }</div>
                </div>      
        <div className='list_scroll'>
          {props.images.map((image) => {
            if (image.contestIdRef === props.contest?.id) {
              return <ImageCard
              image={image}
              key={image.data.asset_id}>
              </ImageCard>
            }
            })
          }
          {props.children}
        </div>
      </div>
    }
    </>
    
  )
}

export default ImageFeed;
