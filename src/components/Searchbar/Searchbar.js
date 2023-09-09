import PropTypes from 'prop-types';
import { Button, Form, Header, Input } from "./Searchbar.styled"
import { FcSearch } from 'react-icons/fc';
import toast from 'react-hot-toast';

export const Searchbar = ({ onSubmit }) => {

    const handlerSubmit = (evt) => {
        evt.preventDefault();
        const { search } = evt.currentTarget;
        const searchValue = search.value.trim();
        if (searchValue === '') {
            toast.error('Please enter search words');
            return;
        }
        onSubmit(searchValue);
        evt.target.reset();
    };


    return (
        <Header>
            <Form onSubmit={handlerSubmit}>
                <Button type="submit" >
                    <FcSearch />
                </Button>
                <Input
                    type="text"
                    name="search"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </Form>
        </Header>
    );
};



Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};