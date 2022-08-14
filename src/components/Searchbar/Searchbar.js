import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import { SearchEntering } from './Searchbar.styled';
import { Form } from './Searchbar.styled';
import { Button } from './Searchbar.styled';
import { Input } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    keyWord: '',
  };

  handleKeywordChange = e => {
    this.setState({ keyWord: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.keyWord.trim() === '') {
      toast.error('Please input keyword');
      return;
    }
    this.props.onSubmit(this.state.keyWord);
    this.setState({ keyWord: '' });
    e.target.reset();
  };

  render() {
    return (
      <SearchEntering>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit" aria-label="Search images">
            <ImSearch style={{ width: '24', height: '24', marginTop: '4' }} />
          </Button>

          <Input
            type="text"
            name="keyWord"
            value={this.state.keyWord}
            onChange={this.handleKeywordChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchEntering>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
