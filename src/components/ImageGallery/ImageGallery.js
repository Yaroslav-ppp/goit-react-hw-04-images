import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Images } from './ImageGallery.styled';
import { Oval } from 'react-loader-spinner';

export const ImageGallery = ({ images, keyWord, onClickPicture, status }) => {
  if (status === 'idle') {
    return <h1>Please, input keyword</h1>;
  }
  if (status === 'pending') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Oval color="#00BFFF" height={80} width={80} />
        <h2>Loading ...</h2>
      </div>
    );
  }
  if (status === 'rejected') {
    return <h1>there are no photos of {keyWord}</h1>;
  }
  if (status === 'resolved') {
    return (
      <>
        <Images>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              tag={image.tags}
              onClick={() => onClickPicture(image.largeImageURL, image.tags)}
            />
          ))}
        </Images>
      </>
    );
  }
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  keyWord: PropTypes.string.isRequired,
  onClickPicture: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
