import React from 'react';
import { useState } from 'react';
import CardComponent from './CardComponent';
import Event from './Event';
const EventList = (props) => {
    const [selectedEvent,setSelectedEvent] = useState(null);
    return (
        <>
            {
                props?.paginateData?.map((event, index) => (
                    <div className={`${!props.showAccordion ? 'col-xl-3' : 'col-xl-4'} col-lg-4 col-md-6  grid-item c-2 c4`} id="test" key={index}>
                        {/* <CardComponent event={event} length={event?.length} index={index} selectClass={props.showSelect} /> */}
                        <Event  event={event} length={event?.length} index={index} selectClass={props.showSelect} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}/>
                    </div>
                ))
            }
        </>
    );
}

export default EventList;