import { useEffect, useState } from 'react';
import { Button, InputGroup, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import Pagination from './Pagination';


const Header = (props) => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const [searchWord, setSearchWord] = useState('');
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState([]);

    const query = searchWord.trim() === '' ? 'A' : searchWord;

    const handleSearchWordChange = (e) => {
        setSearchWord(e.target.value);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    // FUNZIONE CHIAMATA API
    const getUser = async () => {
        try {

            // const token = process.env.REACT_APP_GITHUB_TOKEN;
            const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=10&page=${page}`, {
                headers: {
                    'Authorization': token
                },
            });
            props.setUser(response.data.items)
            console.log('ecco i tuoi utenti', props.user);

            // FACCIO UN'ALTRA CHIAMATA PER OGNI RIUSLTATO PER PRENDERMI I DATI DA UN ALTRO API INTERNO A OGNI USER
            const userDetail = response.data.items.map(user =>
                axios.get(`https://api.github.com/users/${user.login}`, {
                    headers: {
                        'Authorization': token
                    }
                })
            );
            // ASPETTO CHE TUTTE LE CHIAMATE SIANO COMPLETATE
            const userDetailResponses = await Promise.all(userDetail);

            // ESTRAE I DATI DEGLI UTENTI DAL DATA E LI POPOLA IN UN NUOVO ARREY CHE VIENE MESSO IN USER
            props.setUser(userDetailResponses.map(user => user.data));


        } catch (error) {
            console.error("Errore nella chiamata API User:", error);
        }
    }

    const getRepo = async () => {
        try {

            // const token = process.env.REACT_APP_GITHUB_TOKEN;
            const response = await axios.get(`https://api.github.com/search/repositories?q=language:${query}&per_page=10&page=${page}`, {
                headers: {
                    'Authorization': token
                },
            });
            props.setUser(response.data.items)
            console.log('ecco le tue repo', props.user);

        } catch (error) {
            console.error("Errore nella chiamata API Repo:", error);
        }
    }
    // FACCIO PARTIRE UNA CHIAMATA IN BASE ALTYPE CHE VIENE SELEZIONATO
    const search = async () => {
        setPage(1);
        if (type === 'users') {
            getUser();
            // CICLO USANDO ARRAY.FORM MI CREA UN ARRAY DI LUNGHEZZA TOTALPAGES IGNORANDO LA VALUE E PRENDENDO L'INDICE A CUI SOMMA 1 
            setPages(Array.from({ length: 10 }, (_, i) => i + 1));
        } else if (type === 'repositories') {
            getRepo();
            setPages(Array.from({ length: 10 }, (_, i) => i + 1));
        }
    }
    // FACCIO PARTIRE UNA CHIAMATA AL CAMBIAMENTO DI PAGE
    useEffect(() => {
        if (type === 'users') {
            getUser();
        } else if (type === 'repositories') {
            getRepo();
        }
    }, [page]);


    return (
        <section className="containerfluid shadow p-3 overlay">
            <div className="row align-items-center">
                <div className="col-3">
                    <h4>GitHub API con React</h4>
                </div>
                <div className="col-6 text-center row">
                    <InputGroup className="w-75">
                        <Form.Control aria-label="SearchWord" value={searchWord} required onChange={handleSearchWordChange} />
                        {/* {suggestions.length > 0 && (
                            <ListGroup>
                                {suggestions.map((suggestion, index) => (
                                    <ListGroup.Item key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )} */}
                        <select className="form-select" aria-label="Type" value={type} required onChange={handleTypeChange}>
                            {/* SETTO LE VALUE SULLE OPTIONS */}
                            <option value="" disabled>Seleziona un tipo</option>
                            <option value="users">Users</option>
                            <option value="repositories">Repositories</option>
                        </select>
                    </InputGroup>
                    {(type !== '' && searchWord !== '') &&
                        <Button variant="outline-secondary" onClick={search} className='col-2'>Cerca</Button>
                    }
                </div>
                <Pagination page={page} pages={pages} setPage={setPage} />
            </div>
        </section>
    )
}

export default Header