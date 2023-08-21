import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faBars, faListAlt, faTv, faMapMarker, faCalendarDay, faClock, faSliders, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import EventContext from '../../../store/event-classes/event-context';
import { useContext,useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const EventDetailCard = ({ event, isMobile, membersData, url }) => {
    const eventCtx = useContext(EventContext);
    const properties = useSelector(state => state.properties.eventPortalDetailCatalogLabels);
    const classes = useStyles();
    const portalURL = Liferay.ThemeDisplay.getPortalURL();
    const layoutURL = Liferay.ThemeDisplay.getLayoutURL();
    let cancellationDate = "";
    if (event?.cancellationDate || event?.cancellationDate === "") {
        cancellationDate = event?.schedules[0]?.seatings[0]?.cancellationTime;
    }
    else {
        cancellationDate = `${event?.cancellationDate} by ${event?.schedules[0]?.seatings[0]?.cancellationTime}`;
    }
    const defaultImageURL = '/o/northstar-react-portlet/images/default-event-tile-image.png';
    const eventImage = event.imgURL ? portalURL + '/' + event.imgURL : defaultImageURL;
    const imageURL = eventCtx?.showEventImage ? eventImage : defaultImageURL;
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);

    const reDirectToResPortel = async () => {
        setSnackbarOpen(true);
        try {
            const response = await fetch(url, {
                method: 'POST',

                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    memberIds: membersData
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let eventURL = eventCtx?.eventReservationURL;
            if (eventURL === "") {
                eventURL = "/group/pages/events-reservation";
            }
            window.location.href = `${eventURL}?eventId=${event.eventId}&backURL=${layoutURL}#${eventURL}`;
        } catch (error) {
            console.error('Fetch Error:', error);
        } finally {
            setSnackbarOpen(false); // Close the snackbar
        }
    }

    return (
        <div className={classes.root}>
            <Snackbar open={isSnackbarOpen}>
                <Alert  severity="success">
                    Kindly wait redirecting to reservation screen!
                </Alert>
            </Snackbar>
            <div className="course-video-widget sticky-div">
                <div className="course-widget-wrapper mb-30">
                    <div className="course-video-thumb w-img">
                        <img src={imageURL} alt="image not found" />

                    </div>
                    <div className="course-video-price">
                        <span>$315.00</span>
                    </div>
                    <div className="course-video-body">
                        <ul>
                            {eventCtx?.showEventAgeGuideline &&
                                <li>
                                    <div className="course-vide-icon">
                                        <FontAwesomeIcon icon={faSliders} style={{ marginRight: "5px" }} />
                                        <span>{properties?.ageLabel}</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>{event?.minAge}+</span>
                                    </div>
                                </li>
                            }

                            <li>
                                <div className="course-vide-icon">
                                    <FontAwesomeIcon icon={faTv} style={{ marginRight: "5px" }} />
                                    <span>{properties?.eventNumberLabel}:</span>
                                </div>
                                <div className="video-corse-info">
                                    <span>{event?.eventNumber}</span>
                                </div>
                            </li>
                            {eventCtx?.showEventDate &&
                                <li>
                                    <div className="course-vide-icon">
                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: "5px" }} />
                                        <span>{properties?.durationLabel}</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>{event?.date}</span>
                                    </div>
                                </li>
                            }

                            {eventCtx?.showEventDay &&
                                <li>
                                    <div className="course-vide-icon">
                                        <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: "5px" }} />
                                        <span>{properties?.daysLabel}</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>{event?.eventDay}</span>
                                    </div>
                                </li>
                            }

                            {eventCtx?.showEventTime &&
                                <li>
                                    <div className="course-vide-icon">
                                        <FontAwesomeIcon icon={faClock} style={{ marginRight: "5px" }} />
                                        <span>{properties?.timingLabel}</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>{event?.eventTime}</span>
                                    </div>
                                </li>
                            }

                            {eventCtx?.showEventLocation &&
                                <li>
                                    <div className="course-vide-icon">
                                        <FontAwesomeIcon icon={faMapMarker} style={{ marginRight: "5px" }} />
                                        <span>{properties?.locationLabel}</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>{event?.loc}</span>
                                    </div>
                                </li>
                            }

                            {eventCtx?.showEventActivityArea &&
                                <li>
                                    <div className="course-vide-icon">
                                        <FontAwesomeIcon icon={faBars} style={{ marginRight: "5px" }} />
                                        <span>{properties?.activityAreaLabel}</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>{event?.schedules[0]?.seatings[0]?.seatingCourts?.map(value => value?.courtName?.replace(/\,/g, '')).join(' , ')}</span>
                                    </div>
                                </li>
                            }


                            <li>
                                <div className="course-vide-icon text-danger">
                                    <FontAwesomeIcon icon={faListAlt} style={{ marginRight: "5px" }} />
                                    <span className="text-danger">{properties?.lastDayToCancelLabel}: </span>
                                </div>
                                <div className="video-corse-info">
                                    <span className="text-danger">{cancellationDate}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {
                        !isMobile && <div className="video-wishlist">
                            <button className="video-cart-btn cart-toggle-btn" onClick={reDirectToResPortel}>{properties?.registerButtonLabel}</button>
                        </div>
                    }
                    <div className="course-gift">
                        <div className="course-apply-coupon">
                            <a href="#">Add to watchlist</a>
                        </div>
                        <div className="course-gift-coupon">
                            <a href="#">Share</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetailCard;