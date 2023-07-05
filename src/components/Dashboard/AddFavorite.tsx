import React, { useState } from 'react';
import axios from 'axios';
import { Button, List, ListItem, TextInput } from '@tremor/react';
import { Modal } from 'react-bootstrap';
import { search } from '../../utils/searchStocks';
import { FavoriteType, StockType } from '../../types/DashboardTypes';
import styles from './Dashboard.module.css';


interface StockListItemProps {
    stock: StockType;
    mutate: Function;
    user: string | undefined;
    favorites: FavoriteType[];
}

function StockListItem({ stock, mutate, user, favorites }: StockListItemProps) {
    async function handleClick() {
        const duplicate = favorites.some(favorite => favorite.ticker === stock.Symbol)
        if(duplicate) return;

        await axios.post(
            import.meta.env.VITE_DATABASE_FAVORITES_URL,
            { user: user, ticker: stock.Symbol }
        )
        mutate()
    }

    return (
        <ListItem 
            key={stock.Symbol} 
            className={styles.stockListItem}
            onClick={handleClick}
        >
            <div>
                <span className='mr-2 font-bold'>+</span>
                <span>{stock.Symbol}</span>
            </div>
            <span className='mr-2'>{stock.Name}</span>
        </ListItem>
    )
}


interface AddFavoriteProps {
    user: string | undefined;
    mutate: Function;
    favorites: FavoriteType[];
}

function AddFavorite({ user, mutate, favorites }: AddFavoriteProps) {
    const [input, setInput] = useState("");
    const [results, setResults] = useState<StockType[]>([])
    const [show, setShow] = useState(false);

    function handleShowModal() {
        setShow(true)
    }

    function handleCloseModal() {
        setInput("")
        setResults([])
        setShow(false)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.currentTarget.value);
        if(!e.currentTarget.value) {
            setResults([]);
            return;
        }
        search(e.currentTarget.value).then(data => {
            setResults(data)
        });
    }


    return (
        <>
            <ListItem 
                className={styles.addItem} 
                onClick={handleShowModal}
            >
                <span >+ ADD FAVORITE</span>
            </ListItem>

            <Modal 
              show={show} 
              onHide={handleCloseModal}
            >
                <Modal.Header>
                    <Modal.Title>Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextInput
                        key='search-input'
                        placeholder="Symbol (i.e. AAPL)" 
                        value={input} 
                        className='mb-2'
                        onChange={handleInputChange}
                        autoFocus={show}
                    />
                    <List>
                        {results && results.map((result: StockType) => (
                            <StockListItem 
                                key={result.Name} 
                                mutate={mutate} 
                                user={user} 
                                stock={result}
                                favorites={favorites}
                            />
                        ))}
                    </List>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default AddFavorite;