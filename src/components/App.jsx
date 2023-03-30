import { useEffect, useState, useRef } from 'react';

import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { fetchImages } from '../api/pixabayAPI';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [page, setPage] = useState(0);
  const totalImages = useRef(0);

  useEffect(() => {
    if (!page) {
      return;
    }

    const getImages = async () => {
      setShowLoader(true);

      try {
        const { images, newTotalImages } = await fetchImages(searchValue, page);
        totalImages.current = newTotalImages;
        setImages(prevImages => [...prevImages, ...images]);
      } catch (error) {
        alert(error.message);
      } finally {
        setShowLoader(false);
      }
    };

    getImages();
  }, [searchValue, page]);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const openLargeImage = linkImg => {
    setModalImage(linkImg);
    toggleModal();
  };

  const searchFormHandler = formValue => {
    if (formValue === searchValue) {
      return;
    }

    setSearchValue(formValue);
    setImages([]);
    setPage(1);
  };

  const loadMoreHandler = () => {
    setPage(prevState => prevState + 1);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={searchFormHandler} />

      <ImageGallery images={images} modalHandler={openLargeImage} />

      {showLoader && <Loader />}
      {totalImages.current > images.length && !showLoader && (
        <Button loadMore={loadMoreHandler} />
      )}
      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={modalImage} alt="modal" />
        </Modal>
      )}
    </div>
  );
};

export default App;
