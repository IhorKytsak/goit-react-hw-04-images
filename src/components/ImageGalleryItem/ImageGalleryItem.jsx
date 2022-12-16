import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          onClick={e => {
            this.props.modalHandler(e.target.currentSrc);
          }}
          src={this.props.imageLink}
          alt={this.props.imageAlt}
          data-large={this.props.largeImageURL}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageLink: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
