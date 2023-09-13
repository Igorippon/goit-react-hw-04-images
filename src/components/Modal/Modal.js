import { useEffect } from "react";
import PropTypes from 'prop-types';
import { Div, Overlay } from "./Modal.styled";

export const Modal = ({ onClick, image, tags }) => {

    useEffect(() => {
        const handlerKeyDown = (evt) => {
            if (evt.code === "Escape") {
                onClick();
            };
        };

        window.addEventListener('keydown', handlerKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handlerKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onClick]);

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