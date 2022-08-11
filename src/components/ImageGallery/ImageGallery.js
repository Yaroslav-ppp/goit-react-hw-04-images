
import {Component} from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import {Images} from './ImageGallery.styled'



  export default class ImageGallery extends Component {


componentDidUpdate (prevProps, prevState) {


}

 render() {

  const {images, error, loading} = this.props;
  return (
<>
{error  && <h1>
  
      {error.message}
      </h1>}
{loading && <h1>Loading ...</h1>}
{(images.length === 0 && loading === false) && <h1>Please, іnput keyword</h1>}
    
   
    
 <Images >

 
 

{images && (
 images.map((image) => (
<ImageGalleryItem key={image.id} 

  webformatURL={image.webformatURL}
  largeImageURL={image.largeImageURL}
  //  showModal={this.props.showModal}
   tag={image.tags}
 onClick={() => this.props.onClickPicture(image.largeImageURL, image.tags)}
 />
 ))
 )}
   </Images>
 
   </>
 
  )
}

 }   

