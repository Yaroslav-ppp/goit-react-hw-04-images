import React, {Component} from "react";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container} from './App.styled'
import {LoadMore} from './LoadMoreBtn/LoadMoreBtn'
import Searchbar from './Searchbar/Searchbar'
import ImageGallery  from "./ImageGallery/ImageGallery";
import Modal from './Modal/Modal'

export class App extends Component {

  state = {
    keyWord: '',
    images: [],
    loading: false, 
    showModal: false,
      largeImageURL:'',
      tags:'',
      error: '',
   page: 1,

  }

 
 componentDidMount () {
 

}


  componentDidUpdate(prevProps, prevState) {
    
    if (prevState.keyWord !== this.state.keyWord) {
      console.log('прев', prevState.keyWord)
      
      console.log('state', this.state.keyWord)
      console.log('зміна кей ворд')
    
  this.setState({loading: true, images: []}) 

  fetch(`https://pixabay.com/api/?cat=cat&page=1&key=28904331-b5a3a98faf7d975dd3ab63f8b&q=${this.state.keyWord}&image_type=photo&orientation=horizontal&per_page=12`)
    
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`there are no photos of ${this.state.keyWord}`),
      );
    })
    
  
  .then((data) => {
    
 
  this.setState({images: data.hits})
  
})
  .then(console.log("стате", this.state.images))

  .catch(error => this.setState({error}))
  .finally(() => this.setState({loading: false}))
  
 }
      
  }
 
  handleSearchbarSubmit = keyWord => {
    this.setState({keyWord});
  }

  toggleModal = (largeImageURL, tags) => {
    this.setState((state) => ({showModal: !state.showModal, largeImageURL, tags}))
   
  }

  render() {
  
  return (
    <Container
    
    >
      <Searchbar onSubmit={this.handleSearchbarSubmit}/>
     
      <ImageGallery 
      
      images={this.state.images}
      keyWord={this.state.keyWord} 
      onClickPicture={this.toggleModal}
      loading={this.state.loading}
       />
      
      { this.state.showModal  &&  
<Modal
onClose =  {this.toggleModal }
LargeImage = {this.state.largeImageURL}
>
  <img src = {this.state.largeImageURL}  alt={this.state.tags} />
  </Modal>
  }
  <LoadMore />
  
  <ToastContainer position="top-center"

autoClose={2000} 
theme="colored"
/>
    </Container>
  );
}
}