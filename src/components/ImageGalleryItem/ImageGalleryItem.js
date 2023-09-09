import PropTypes from 'prop-types';
import { Img, Item } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ tags, webformatURL, onClick, largeImageURL }) => {
    return (
        <Item onClick={() => onClick(largeImageURL, tags)}>
            <Img src={webformatURL} alt={tags} />
        </Item>
    );
};

ImageGalleryItem.propTypes = {
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};