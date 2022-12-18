import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  imageLink,
  imageAlt,
  largeImageURL,
  modalHandler,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        onClick={e => {
          modalHandler(e.target.currentSrc);
        }}
        src={imageLink}
        alt={imageAlt}
        data-large={largeImageURL}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageLink: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
