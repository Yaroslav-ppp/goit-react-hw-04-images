import React from 'react';
import { LoadMoreBtn } from './LoadMoreBtn.styled';

export const LoadMore = ({ onClick }) => {
  return (
    <LoadMoreBtn type="button" onClick={onClick}>
      <span>Load more</span>
    </LoadMoreBtn>
  );
};
