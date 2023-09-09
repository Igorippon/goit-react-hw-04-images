import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { Layuot } from "./Layout";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { serviceSearch } from "api";
import { Button } from "./Button/Button.js";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [image, setImage] = useState('');
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [tags, setTags] = useState('');
  const [randomId, setRandomId] = useState('');

  useEffect(() => {
    if (query === '') {
      return
    }
    async function getImages() {
      try {
        setLoader(true);
        const { hits, totalHits } = await serviceSearch(query, page);
        if (totalHits === 0) {
          toast.error('Nothing found for your request');
          return;
        };
        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }
        setImages(prevImages =>
          [...prevImages, ...hits],
        );
        setTotal(Math.ceil(totalHits / 12));
      } catch (error) {
        toast.error('Oops... something went wrong, please reload the page!');
      } finally {
        setLoader(false);
      };
    };
    getImages()

  }, [page, query, randomId]);

  const handlerSubmitForm = (searchValue) => {
    setQuery(searchValue);
    setRandomId(`${Date.now()}/${searchValue}`);
    setPage(1);
    setImages([]);
    setTotal(0);
  };

  const handlerClickLoadMore = () => {
    setPage(prevPage => (prevPage + 1));
  };

  const handlerClickImage = (largeImageURL, tags) => {
    toggleModal();
    setImage(largeImageURL);
    setTags(tags);
  };

  const toggleModal = () => {
    setModal(!modal);
  }

  return (
    <Layuot >
      <Searchbar onSubmit={handlerSubmitForm} />
      <ImageGallery images={images}
        onClick={handlerClickImage} />
      {loader && <Loader />}
      {images.length > 0 && page < total && <Button onClick={handlerClickLoadMore} />}
      {modal && <Modal onClick={toggleModal} image={image} tags={tags} />}
    </Layuot>
  );
};

