import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    return (
      <ul className="ImageGallery">
        {this.props.imagesArray.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              imageLink={image.webformatURL}
              imageAlt={image.tags}
              largeImageURL={image.largeImageURL}
              modalHandler={this.props.modalHandler}
            />
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  imagesArray: PropTypes.array.isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default ImageGallery;
