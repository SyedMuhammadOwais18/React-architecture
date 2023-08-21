import { faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
const DetailsHeader = ({showHiddenDetailsHandler,eventDetail}) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="event-box-text">
                    <div className="row">
                        <h3>
                            <a href="#">{eventDetail.name}</a>
                        </h3>
                    </div>
                </div>
                <a href="#" className="cartmini__del">
                    <FontAwesomeIcon icon={faTrashAlt} className="fa-trash-can" />
                </a>
                <span className="cartmini__edit" onClick={showHiddenDetailsHandler}>
                    <FontAwesomeIcon icon={faUserEdit} />
                </span>
            </div>
        </div>
    );
}

export default DetailsHeader;