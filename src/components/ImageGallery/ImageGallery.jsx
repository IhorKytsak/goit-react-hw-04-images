import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ imagesArray, modalHandler }) => {
  return (
    <ul className="ImageGallery">
      {imagesArray.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            imageLink={image.webformatURL}
            imageAlt={image.tags}
            largeImageURL={image.largeImageURL}
            modalHandler={modalHandler}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  imagesArray: PropTypes.array.isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default ImageGallery;
