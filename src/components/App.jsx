import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const apiKey = '32099217-de7cf2504ca4eed95138fd014';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const request = await getImages(searchValue, currentPage);
        setImages(prevArray => [...prevArray, ...request]);
      } catch (error) {
        alert(error.message);
      } finally {
        setShowLoader(false);
      }
    };

    fetchImages();
  }, [searchValue, currentPage]);

  const getImages = async (words, page) => {
    const request = await axios.get(
      `https://pixabay.com/api/?q=${words}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return request.data.hits;
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const openLargeImage = linkImg => {
    setModalImage(linkImg);
    toggleModal();
  };

  const searchFormHandler = formValue => {
    if (formValue.trim() === '' || formValue === searchValue) {
      return;
    }
    setShowLoader(true);
    setSearchValue(formValue);
    setImages([]);
    setCurrentPage(1);
  };

  const loadMoreHandler = () => {
    setShowLoader(true);
    setCurrentPage(prevState => prevState + 1);
  };

  return (
    <div className="App">
      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={modalImage} alt="modal" />
        </Modal>
      )}
      <Searchbar onSubmit={searchFormHandler} />

      {searchValue !== '' && (
        <ImageGallery imagesArray={images} modalHandler={openLargeImage} />
      )}
      {showLoader && <Loader />}
      {searchValue !== '' && images.length > 0 && (
        <Button loadMore={loadMoreHandler} />
      )}
    </div>
  );
};

export default App;
