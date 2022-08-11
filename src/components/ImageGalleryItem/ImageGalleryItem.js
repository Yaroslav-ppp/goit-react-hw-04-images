import React from "react";
import {ImageItem} from './ImageGalleryItem.styled'
import {ImageGalleryPicture} from './ImageGalleryItem.styled'


export const ImageGalleryItem = ({webformatURL, onClick, tag}) => {

   return (  
    
      
<ImageItem  
onClick={onClick} 

>

   <ImageGalleryPicture 
  


 src={webformatURL} 
 alt={tag}
 
 /> 

</ImageItem>
   
   )
   }
 
  
 
  
   

