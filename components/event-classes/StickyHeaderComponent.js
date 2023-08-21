import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent';


const StickyHeaderComponent = (props) => {
    const [sticky, setSticky] = useState("");
    const checkMobileScreen = props.checkIsMobile;
    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };

    }, []);

    const handleFilterSlider = () => {
        props.openFilterSliderHandler(true);
    }

    const isSticky = (e) => {
        const scrollTop = window.scrollY;
        const stickyClass = scrollTop >= 250 ? (props.isAdmin > 0 ? "is-sticky-member" : "is-sticky-admin"): "";
        setSticky(stickyClass);
    };
    const classes = `${sticky}`;

    return (

        <header className={classes}>
           <div className="row">
					<div className="col-9">
						<div className={`course-main-wrapper ${props.checkFilter ? 'd-none' : 'hidden-desktop'} `}>
							{checkMobileScreen &&
								<SearchComponent onSearch={props.onSearch} showSearchOverlayHandler={props.showSearchOverlayHandler} data={props.data} show={props.show} />}
						</div>
					</div>
					{checkMobileScreen &&
						<div className="col-3">
							<div className="bt52">
								<div className="bar-filter f-phone" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
									<FontAwesomeIcon icon={faSliders} onClick={handleFilterSlider} />

								</div>
							</div>
						</div>
					}


				</div>
        </header>



    );

}

export default StickyHeaderComponent;