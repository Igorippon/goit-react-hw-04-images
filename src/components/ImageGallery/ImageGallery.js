import PropTypes from 'prop-types';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { List } from "./ImageGallery.styled";


export const ImageGallery = ({ images, onClick }) => {
    return (
        <List >
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
                <ImageGalleryItem key={id}
                    webformatURL={webformatURL}
                    tags={tags}
                    largeImageURL={largeImageURL}
                    onClick={onClick}
                />
            ))}
        </List>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
}