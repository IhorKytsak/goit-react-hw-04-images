import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const apiKey = '32099217-de7cf2504ca4eed95138fd014';

const App = () => {
  const initState = {
    searchValue: '',
    images: [],
    modalImage: '',
    showModal: false,
    showLoader: false,
    currentPage: 1,
  };

  const [state, setState] = useState(initState);

  const { searchValue, currentPage } = state;

  useEffect(() => {
    getImages(searchValue, currentPage);
  }, [searchValue, currentPage]);

  const toggleModal = () => {
    setState(prevState => ({ ...prevState, showModal: !prevState.showModal }));
  };

  const addNewImages = newImages => {
    const newSearchArray = [...state.images, ...newImages];

    setState(prevState => ({ ...prevState, images: newSearchArray }));
  };

  const openLargeImage = linkImg => {
    setState(prevState => ({ ...prevState, modalImage: linkImg }));
    toggleModal();
  };

  const loaderToggle = boolean => {
    setState(prevState => ({ ...prevState, showLoader: boolean }));
  };

  const getImages = (words, page) => {
    loaderToggle(true);
    axios
      .get(
        `https://pixabay.com/api/?q=${words}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const receivedImages = response.data.hits;
        addNewImages(receivedImages);
        loaderToggle(false);
      })
      .catch(error => {
        loaderToggle(false);
        alert(error.message);
      });
  };

  const searchFormHandler = searchValue => {
    if (searchValue.trim() === '' || searchValue === state.searchValue) {
      return;
    }

    setState(prevState => ({
      ...prevState,
      searchValue: searchValue,
      images: [],
      currentPage: 1,
    }));
  };

  const loadMoreHandler = () => {
    setState(prevState => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
    }));
  };

  return (
    <div className="App">
      {state.showModal && (
        <Modal closeModal={toggleModal}>
          <img src={state.modalImage} alt="modal" />
        </Modal>
      )}
      <Searchbar onSubmit={searchFormHandler} />

      {state.searchValue !== '' && (
        <ImageGallery
          imagesArray={state.images}
          modalHandler={openLargeImage}
        />
      )}
      {state.showLoader && <Loader />}
      {state.searchValue !== '' && state.images.length > 0 && (
        <Button loadMore={loadMoreHandler} />
      )}
    </div>
  );
};

export default App;
