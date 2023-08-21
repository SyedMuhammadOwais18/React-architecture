import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const QuestionSection = ({ question,member,onAnswerChange }) => {    
    switch (question.questionType) {
        case 'textbox':
            return (
                <>
                <h1>{member?.name}</h1>
                <div className="col-12">

                    <span className='f-bold'>{question.question}</span>
                    <br />
                    <input className='guest-input' type="text" id="searchGuest" onChange={e => onAnswerChange(member?.id,question.questionId,e.target.value)} />
                </div>
                </>
            );
        case 'text':
            return (
                <div className='col-12'>
                    <span className='f-bold'>{question.question}</span>
                    <br />
                    <textarea className='guest-input' onChange={e => onAnswerChange(member?.id,question.questionId,e.target.value)} />
                </div>
            );
        case 'singleSelect':
            return (
                <div className='col-12 check-radio-option'>
                    {Object.entries(question.options).map(([key, value]) => (
                        <Fragment key={key}>
                            <span className='f-bold'>{value}</span>
                            <input type="radio" className='questions-checkbox' id={key} value={value} name={question.questionId} onChange={e => onAnswerChange(member?.id,question.questionId,e.target.value)} />
                        </Fragment>
                    ))}
                </div>
            );
        case 'multiSelect':
            return (
                <div className='col-12 check-box-option'>
                    {Object.entries(question.options).map(([key, value]) => (
                        <Fragment key={key}>
                            <span className='f-bold'>{value}</span>
                            <input type="checkbox" className='questions-checkbox' id={key} value={value} name={question.questionId} onChange={e => onAnswerChange(member?.id,question.questionId,e.target.value)} />
                        </Fragment>
                    ))}
                </div>

            );
        default:
            return null;
    }
    // return (
    //     <div className='row'>
    //         <div className="col-12">
    //             <button className="btn btn-success btn-custom-font w-100" onClick={props.backHandler}>Back</button>
    //         </div>
    //         <div className='col-12'>
    //             <h2>Question Answers</h2>
    //         </div>
    //         <div className="col-12">
    //             <span className='f-bold'>Do you have any allergy?</span>
    //             <br />
    //             <input className='guest-input' type="text" id="searchGuest" />
    //         </div>
    //         <div className="col-12">
    //             <span className='f-bold'>Your past experiance on this event? </span>
    //             <br />
    //             <input className='guest-input' type="text" id="searchGuest" />
    //         </div>
    //         <div className="col-12 check-box-option">
    //             <span className='f-bold'>Experiance Level</span> <br />
    //             <input type="checkbox" id="" className='questions-checkbox'/>
    //             <span>Beginner</span>
    //             <input type="checkbox" id="" className='questions-checkbox'/>
    //             <span>Mid-Level</span>
    //             <input type="checkbox" id="" className='questions-checkbox'/>
    //             <span>Pro</span>
    //         </div>
    //         <div className="col-12 check-box-option">
    //             <span className='f-bold'>Resource Availability</span><br />
    //             <input type="checkbox" id="" className='questions-checkbox'/>
    //             <span>Badge</span>
    //             <input type="checkbox" id="" className='questions-checkbox'/>
    //             <span>Food</span>
    //             <input type="checkbox" id="" className='questions-checkbox'/>
    //             <span>Track of sight seesing</span>
    //         </div>
    //     </div>
    // );
}

export default QuestionSection;