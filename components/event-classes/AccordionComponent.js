import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUserEdit, faClock, faDesktop, faCalendarAlt, faCalendarDay, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import SelectedMemberComponent from "./SelectedMemberComponent.js";
import { SelectMemberData } from '../../Data/SelectMemberData';
import DetailsHeader from './SidePanel/DetailsHeader.js';
import RegistrationBasicInfo from './SidePanel/RegistrationBasicInfo.js';
import MemberInfoWrapper from './SidePanel/MemberInfoWrapper.js';
import QuestionSection from './SidePanel/QuestionSection.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { eventReservationActions } from '../../redux-store/index.js';
const AccordionSummary = withStyles({
	content: {
		margin: 0,
		alignItems: "center",
	}
})(MuiAccordionSummary);
const member = [
	{
		id: '1',
		name: 'Bob',
		title: 'Jazz Expert',
		session: 12,
		start_time: '12:00 PM',
		end_time: '4:00 PM',
		start_date: '1st Aug',
		end_date: '2nd Sep',
		status: 'Aligns with Sam',
		price: 12.00,
		event: 'MWF',
		checked: false
	},
	{
		id: '2',
		name: 'Bob1',
		title: 'Jazz Expert',
		session: 12,
		start_time: '12:00 PM',
		end_time: '4:00 PM',
		start_date: '1st Aug',
		end_date: '2nd Sep',
		status: 'Aligns with Sam',
		price: 12.00,
		event: 'MWF',
		checked: false
	},

]
export default function AccordionComponent(props) {
	const dispatch = useDispatch();
	const [activeMember, setActiveMember] = useState(props.data);
	const [eventDetail, setEventDetail] = useState(props.eventDetail);
	const Questions = useSelector(state => state.eventDetails.event.questions);

	console.log("Questions : ", Questions);
	const attendees = useSelector(state => state.eventReservation.attendees);
	console.log("Attendees : ",attendees);
	const questionIdAndAnswerMap = useSelector(state => state.eventReservation.questionIdAndAnswerMap);
	const [showHiddenDetails, setShowHiddenDetails] = useState(false);
	const [isNext, setIsNext] = useState(false);
	const [answers, setAnswers] = useState({});
	const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);
	const Member = member[currentMemberIndex];
	console.log("Member : ", Member);
	useEffect(() => {
		setEventDetail(props.eventDetail)
	}, [props.eventDetail])
	const showHiddenDetailsHandler = () => setShowHiddenDetails(!showHiddenDetails);
	const handleAnswerChange = (memberId, questionId, answer) => {
		console.log("answers : ", answer)
		console.log("member Id :",memberId);
		console.log("question Id : ",questionId);
		//if member is null it means question section for reservation
		if(memberId == null && member?.length > 0){
			dispatch(eventReservationActions.setQuestionIdAndAnswerMap({
				...questionIdAndAnswerMap,
				[questionId]:answer
			}))
		}
		else if(member?.length > 0 && memberId !== null){
			const currentAttendees = [...attendees] ;
			console.log("current Attendees : ",currentAttendees);
			let attendeeIndex = currentAttendees.findIndex(attendee => attendee.memberId === memberId);
			if(attendeeIndex === -1) {
				// if there isn't, create a new Attendee object
				currentAttendees.push({
					memberId: memberId,
					questionIdAndAnswerMap: {
						[questionId]: answer
					}
				});
			} else {
				// if there is, update the existing Attendee object
				currentAttendees[attendeeIndex].questionIdAndAnswerMap[questionId] = answer;
			}
    
		// Dispatch the new attendees
		dispatch(eventReservationActions.setAttendees(currentAttendees));
		}
		
	}

	const onPrev = () => {
		console.log("Prev Current Step  :", currentStep);
		console.log("Prev Current Member Index : ", currentMemberIndex);
		if (currentStep > 2) {
			setCurrentStep(currentStep - 1);
			setCurrentMemberIndex(currentMemberIndex - 1);
		}
		else {
			setCurrentStep(currentStep - 1);
		}
	};

	const onNext = () => {
		console.log("Next Current Step  :", currentStep);
		console.log("Next Current Member Index : ", currentMemberIndex);
		if (currentStep < 2) {
			setCurrentStep(currentStep + 1);
		}
		else if (currentMemberIndex < member.length - 1) {
			setCurrentMemberIndex(currentMemberIndex + 1);
			setCurrentStep(currentStep + 1); // increment currentStep on every next click
		}
	};

	return (
		<>
			{activeMember.map((activeMember, key) => (
				<div className="accordion-padding" key={key} >
					{/* {currentMemberIndex > 0 && <button onClick = {() => setCurrentMemberIndex(currentMemberIndex-1)}>Previous</button>} */}
					<Accordion className='accordion-styling'>
						<AccordionSummary
							expandIcon={<FontAwesomeIcon icon={faChevronDown} style={{ color: 'white' }} />}
							aria-label="Expand"
							aria-controls={`panel${key + 1}a-content`}
							id={`panel${key + 1}a-header`}
							className="drawer-accordion-summary"
						>
							<img src={activeMember.img} className="chkout-dp-cart" />
							<span>{activeMember.name}</span>
							<span className="cart-counter">{activeMember.count}</span>
						</AccordionSummary>
						<AccordionDetails className="accordion-details">
							<div className="accordion-body">
								<ul>
									{activeMember.member.map((activeMember, index) => (
										<li key={index}>
											<div className="event-tour">
												{/* {!isNext ? */}
												{currentStep == 0 &&
													<>
														<DetailsHeader eventDetail={eventDetail} showHiddenDetailsHandler={showHiddenDetailsHandler} />
														<div className="row">
															<RegistrationBasicInfo eventDetail={eventDetail} />
															{showHiddenDetails &&


																<div className="col-12">
																	<MemberInfoWrapper data={SelectMemberData} accordion={true} members={props.members} onSetMembersData={props.onSetMembersData} />
																	{/* {Questions?.length > 0 && <span className="btn btn-success btn-custom-font w-100" onClick={nextHandler}  >
																		<FontAwesomeIcon icon={faCheck} className="mr-10" />Next
																	</span>} */}
																</div>


															}




														</div>
													</>
												}

												{currentStep == 1 &&
													<>
														{Questions?.length > 0 &&

															<div className='row'>
																<h3>For Reservation</h3>
																{Questions.filter(question => question.questionFor == 0)?.map((question) => (
																	<QuestionSection key={question.questionId} member={[]} question={question} onAnswerChange={handleAnswerChange} />
																))}

															</div>
														}
													</>
												}
												{currentStep > 1 &&
													<>
														{Questions?.length > 0 &&
															<>
																<div className='row'>
																	{/* {member.map((member, index) => ( */}
																	<h4>{Member.name}</h4>
																	{Questions.filter(question => question.questionFor == 1).map(question => (
																		<QuestionSection key={question.questionId} question={question} member={Member} onAnswerChange={handleAnswerChange} />
																	))}
																	{/* ))} */}
																</div>
															</>
														}
													</>

												}

											</div>
										</li>
									))}
								</ul>
								<div className='row'>
									<div className='col-12 mt-10'>
										<span className='btn btn-success w-100' onClick={onPrev} disabled={currentStep === 0}><FontAwesomeIcon icon={faCheck} className="mr-10" />Previous</span>
										<span className='btn btn-success w-100 mt-10' onClick={onNext} disabled={currentMemberIndex === member.length - 1}><FontAwesomeIcon icon={faCheck} className="mr-10" />Next</span>
									</div>
								</div>
							</div>
						</AccordionDetails>
					</Accordion>
					{/* {currentMemberIndex < member.length - 1 && <button onClick = {() => setCurrentMemberIndex(currentMemberIndex+1)}>Next</button>} */}
				</div>
			))}
		</>
	);
}