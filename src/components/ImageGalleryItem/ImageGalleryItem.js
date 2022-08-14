import React from 'react';
import PropTypes from 'prop-types';
import { ImageItem } from './ImageGalleryItem.styled';
import { ImageGalleryPicture } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, onClick, tag }) => {
  return (
    <ImageItem onClick={onClick}>
      <ImageGalleryPicture src={webformatURL} alt={tag} />
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tag: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
