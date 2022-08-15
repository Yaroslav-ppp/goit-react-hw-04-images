import React, { Component } from 'react';
import * as Scroll from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import { LoadMore } from './LoadMoreBtn/LoadMoreBtn';
import Searchbar from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

const scroll = Scroll.animateScroll;

export class App extends Component {
  state = {
    keyWord: '',
    images: [],
    showModal: false,
    largeImageURL: '',
    tags: '',
    error: '',
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.keyWord !== this.state.keyWord ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  getImages() {
    this.setState({ status: 'pending' });

    fetch(
      `https://pixabay.com/api/?cat=cat&page=${this.state.page}&key=28904331-b5a3a98faf7d975dd3ab63f8b&q=${this.state.keyWord}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data =>
        data.hits.length === 0
          ? this.setState({ status: 'rejected' })
          : this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
              status: 'resolved',
            }))
      )
      .then(('стате', this.state.images))

      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  handleSearchbarSubmit = keyWord => {
    this.setState({ keyWord, page: 1, images: [] });
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(state => ({
      showModal: !state.showModal,
      largeImageURL,
      tags,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    scroll.scrollToBottom();
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />

        <ImageGallery
          images={this.state.images}
          keyWord={this.state.keyWord}
          onClickPicture={this.toggleModal}
          status={this.state.status}
        />

        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            LargeImage={this.state.largeImageURL}
          >
            <img src={this.state.largeImageURL} alt={this.state.tags} />
          </Modal>
        )}
        {this.state.images.length > 0 && this.state.status === 'resolved' && (
          <LoadMore onClick={this.handleLoadMore} />
        )}

        <ToastContainer
          position="top-center"
          autoClose={2000}
          theme="colored"
        />
      </Container>
    );
  }
}
