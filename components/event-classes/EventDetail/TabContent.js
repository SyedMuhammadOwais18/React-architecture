import React, { useState } from 'react';
import LoaderComponent from '../LoaderComponent';
import EventDetailCard from './EventDetailCard';
import EventDetails from './EventDetails';


const TabContent = ({ activeTab, eventDetail, loading, members, isMobile, instructors, switchTab, membersData, onSetMembersData }) => {

	const [startX, setStartX] = useState(null);
	const [transition, setTransition] = useState('');

	const handleTouchStart = (event) => {
		const touch = event.touches[0];
		setStartX(touch.clientX);
		setTransition('');
	};

	const handleTouchMove = (event) => {
		if (!startX) {
			return;
		}

		const touch = event.touches[0];
		const currentX = touch.clientX;
		const diffX = startX - currentX;

		if (diffX > 0) {
			// Swiped left
			switchTab('tab2');
			setTransition('swipe-left');
		} else if (diffX < 0) {
			// Swiped right
			switchTab('tab1');
			setTransition('swipe-right');
		}

		setStartX(null);
	};

	return (
		loading ? (<LoaderComponent />) : (eventDetail && Object?.keys(eventDetail)?.length > 0 &&
			<div className="tab-content">
				<div className={`swipe-transition ${transition}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} style={{ touchAction: 'pan-y' }}>
					<div className={`tab ${activeTab === 'tab1' ? 'active' : ''}`} id="tab1">
						<div className="col-xxl-4 col-xl-4 col-lg-8 col-md-8">
							<EventDetailCard event={eventDetail} isMobile={isMobile} membersData={membersData}/>
						</div>
					</div>
					<div className={`tab ${activeTab === 'tab2' ? 'active' : ''}`} id="tab2">

						<EventDetails eventDetail={eventDetail} members={members} isMobile={isMobile} instructors={instructors} onSetMembersData={onSetMembersData}/>

					</div>
				</div>
			</div>
		)
	);
}

export default TabContent;