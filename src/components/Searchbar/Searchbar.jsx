import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  onSubmitHandler = event => {
    event.preventDefault();

    const searchValue = event.target[1].value;
    this.props.onSubmit(searchValue);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmitHandler}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
