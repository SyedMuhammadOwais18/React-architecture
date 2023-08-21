import { faCalendarAlt, faCalendarDay, faClock, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const RegistrationBasicInfo = ({eventDetail}) => {
    let session = eventDetail.eventSessions > 1 ? 'Sessions' : 'Session';  
    return (
       
        <>
            <div className="col-6">
                <FontAwesomeIcon icon={faDesktop} className="mr-5" />
                <span> {eventDetail.eventSessions} {session} </span>
            </div>
            <div className="col-6">
                <FontAwesomeIcon icon={faClock} className="mr-5" />
                <span>{eventDetail.eventTime}</span>
            </div>
            <div className="col-6">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-5" />
                <span>{eventDetail.date}</span>
            </div>
            <div className="col-6">
                <FontAwesomeIcon icon={faCalendarDay} className="mr-5" />
                <span>{eventDetail.eventDay}</span>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-9 msg-info">
                        <span className="aligns-msg">
                            {'Align with Sam'}
                        </span>
                    </div>
                    <div className="col-3">
                        <div className="cart-price cart-price-margin">
                            <span>${'12'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegistrationBasicInfo;