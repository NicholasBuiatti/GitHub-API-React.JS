import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './List.css'
const List = (props) => {
    return (
        <section className='container mt-4 overflow-auto' style={{ height: '85vh' }}>
            {
                (props.user.length == 0) ?
                    <div className="container bg-card-start">
                        <article className="row col-8 m-auto text-center border border-dark rounded shadow ">
                            <h1>Ricerca le tue repositories o l'utente su GitHub</h1>
                        </article>

                    </div>
                    : (
                        <ul className='row justify-content-between'>
                            {props.user.map((user) => {
                                return (
                                    <li className='list-group-item mx-2 col-2' key={user.id}>
                                        {/* SE ESISTE OWNER NELLO USER MI FAI CARDSINGLEREPO */}
                                        {user.owner ? (
                                            <CardSingleRepo user={user} />
                                        ) : (
                                            <CardSingleUser user={user} />
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    )
            }

        </section>
    )
}

const CardSingleUser = ({ user }) => {
    return (
        <Card className='custom-card shadow mb-3'>
            <div className='card-header-section'>
                <Card.Img variant="top" src={user.avatar_url} className='profile-image w-50 rounded-circle my-3' />
            </div>
            <Card.Body className='card-body-section'>
                <Card.Title className='mt-2 text-center'>
                    <div>{user.login}</div>
                    <div className='small-text text-secondary fs-6'>{user.name}</div>
                </Card.Title>
                <Card.Text className='truncated-text'>
                    {user.bio || 'Nessuna descrizione!'}
                </Card.Text>
                <ListGroup variant="flush">
                    <ListGroup.Item>Follower: {user.followers}</ListGroup.Item>
                    <a className="btn text-white" style={{ backgroundColor: "#333333" }} href={user.html_url} role="button">
                        Profilo <i className="fab fa-github"></i>
                    </a>
                </ListGroup>

            </Card.Body>
        </Card >
    )
}

const CardSingleRepo = ({ user }) => {
    return (
        <Card className='custom-card shadow mb-3'>
            <div className='card-header-section'>
                <Card.Img variant="top" src={user.owner.avatar_url} className='profile-image w-50 rounded-circle my-3' />
            </div>
            <Card.Body className='card-body-section'>
                <Card.Title className='mt-2 text-center'>
                    <div>{user.name}</div>
                    <div className='small-text text-secondary fs-6'>{user.language}</div>
                </Card.Title>
                <Card.Text className='truncated-text'>
                    {user.description || 'Nessuna descrizione!'}
                </Card.Text>
                <ListGroup variant="flush">
                    <ListGroup.Item>Visitata: {user.watchers}</ListGroup.Item>
                    <ListGroup.Item>Creata: {user.created_at}</ListGroup.Item>
                    <a className="btn text-white" style={{ backgroundColor: "#333333" }} href={user.html_url} role="button">
                        Profilo <i className="fab fa-github"></i>
                    </a>
                </ListGroup>

            </Card.Body>
        </Card >
    )
}

export default List