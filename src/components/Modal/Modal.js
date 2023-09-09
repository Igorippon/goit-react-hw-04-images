import { useEffect } from "react";
import PropTypes from 'prop-types';
import { Div, Overlay } from "./Modal.styled";


export const Modal = ({ onClick, image, tags }) => {

    useEffect(() => {
        window.addEventListener('keydown', handlerKeyDown);

        return () => {
            window.removeEventListener('keydown', handlerKeyDown);
        };
    },);

    const handlerKeyDown = (evt) => {
        if (evt.code === "Escape") {
            onClick();
        };
    };

    const handlerClick = (evt) => {
        if (evt.currentTarget === evt.target) {
            onClick();
        }
    }

    return (
        <Overlay onClick={handlerClick} >
            <Div >
                <img src={image} alt={tags} />
            </Div>
        </Overlay>
    );

}

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}