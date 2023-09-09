import { Component } from "react";
import toast from 'react-hot-toast';
import { Layuot } from "./Layout";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { serviceSearch } from "api";
import { Button } from "./Button/Button.js";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";



export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    image: '',
    total: 0,
    loader: false,
    modal: false,
    tags: '',
    randomId: ''
  };



  componentDidUpdate = async (prevProps, prevState) => {
    const { page, query, randomId, total } = this.state;
    if (prevState.page !== page || prevState.randomId !== randomId) {
      try {
        this.setState({ loader: true });
        const { hits, totalHits } = await serviceSearch(query, page);
        if (totalHits === 0) {
          toast.error('Nothing found for your request');
          return;
        };
        if (prevState.total !== total) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        };
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          total: Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        toast.error('Oops... something went wrong, please reload the page!');
      } finally {
        this.setState({ loader: false });
      };

    };
  };

  handlerSubmitForm = (searchValue) => {
    this.setState({ query: searchValue, randomId: `${Date.now()}/${searchValue}`, page: 1, images: [], total: 0 })
  };

  handlerClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handlerClickImage = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({ image: largeImageURL, tags: tags });
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    const { images, image, page, total, loader, modal, tags } = this.state;

    return (
      <Layuot >
        <Searchbar onSubmit={this.handlerSubmitForm} />
        <ImageGallery images={images}
          onClick={this.handlerClickImage} />
        {loader && <Loader />}
        {images.length > 0 && page < total && <Button onClick={this.handlerClickLoadMore} />}
        {modal && <Modal onClick={this.toggleModal} image={image} tags={tags} />}
      </Layuot>
    );
  };
};
