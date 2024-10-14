import React from 'react'

const Pagination = (props) => {
    return (
        <>
            {(props.pages.length == 0) ||
                <div className="col-3 align-center">
                    <ul className="pagination justify-content-end mb-0">
                        <li className="page-item">
                            {(props.page > 1) ?
                                <li className="page-item">
                                    <a className="page-link" onClick={() => props.setPage(oldValue => oldValue - 1)}>
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </a>
                                </li> :
                                <li className="page-item disabled">
                                    <a className="page-link">
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </a>
                                </li>
                            }
                        </li>
                        {props.pages.map((el) => (
                            (el >= (props.page - 1) && el <= (props.page + 1)) && (
                                <li key={el} className="page-item">
                                    {(props.page === el) ? (
                                        <a className="page-link border border-3 border-primary" onClick={() => { props.setPage(el); }} href="#">
                                            {el}
                                        </a>
                                    ) : (
                                        <a className="page-link" onClick={() => { props.setPage(el); }} href="#">
                                            {el}
                                        </a>
                                    )}
                                </li>
                            )
                        ))}
                        {(props.page < props.pages.length) ?
                            <li className="page-item">
                                <a className="page-link" onClick={() => props.setPage(oldValue => oldValue + 1)}>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </a>
                            </li> :
                            <li className="page-item disabled">
                                <a className="page-link">
                                    <i className="fa-solid fa-arrow-right"></i>
                                </a>
                            </li>
                        }
                    </ul>
                </div>
            }
        </>
    )
}

export default Pagination