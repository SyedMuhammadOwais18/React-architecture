
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import EventSlider from './EventSlider';
import Event from './Event';

const FeaturedEventList = ({ featuredEvents, isMobile }) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
    const [showSelect, setShowSelect] = useState(false);
    const [selectedEvent,setSelectedEvent] = useState(null);
    return (

        <EventSlider>
            {featuredEvents && featuredEvents?.length > 0 &&
                <div className='row grid adjust-featured-event' >
                    {featuredEvents.map((event, index) => (
                        <div className={`col-xl-3 col-lg-3 col-md-6  ${isMobile && 'col-sm-12 col-xs-12 grid-item'}`} id='test' key={index}>
                            <SwiperSlide key={index} ><Event event={event} index={index} selectClass={showSelect} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} /></SwiperSlide>
                        </div>
                    ))
                    }
                </div>

            }
        </EventSlider>





    );
}

export default FeaturedEventList;