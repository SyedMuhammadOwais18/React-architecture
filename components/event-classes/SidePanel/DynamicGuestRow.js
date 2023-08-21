
import { faInfoCircle, faNotesMedical, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, makeStyles, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventReservationActions, reservationPanelActions } from '../../../redux-store/index.js';
import AutoComplete from './AutoComplete.js';
import CustomDropdown from './CustomDropDown.js';
import SalesItem from './SalesItem.js';
const DynamicGuestRow = ({ field, index, classes, onRemove, onAdd, onInput, currentUser }) => {
    const salesItems = useSelector(state => state.eventDetails.event.salesItems);
    const attendees = useSelector(state => state.eventReservation.attendees);
    console.log("ATTENDEE : ", attendees);
    console.log("Dynamic Guest Row Field : ",field);
    const [showSalesItemComponent, setShowSalesItemComponent] = useState(false);

    const handleIconClick = () => {
        setShowSalesItemComponent(prevState => !prevState);
    }
    return (
        <div className="row" style={{ position: 'relative' }} key={index}>

            <div className="col-1">
                <FontAwesomeIcon icon={faTrashAlt} className={`fa-trash-can removeIcon ${index == 0 && 'disabled-remove-icon'}`} onClick={index == 0 ? null : () => onRemove(field.index, index)} />
            </div>
            {/* <div className="col-6">Guest/Member 
                <input type="text" id="searchGuest" className='guest-input' value={field.value} onChange={(event) => handleInput(index,event)}/>
            </div> */}
            {!field.isDependent &&
                <AutoComplete value={field.value} type={field.option} index={index} onInputChange={onInput} currentUser={currentUser} />
            }
            {field.isDependent &&
                <div className="col-4 pl-0 pr-0 ml-0">Guest/Member
                    <h5 className='selected-dependents'>{field.value}</h5>
                </div>
            }

            <div className="col-2">Type
                <FormControl className={classes.formControl}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="type"
                        value={field.option}
                        MenuProps={{
                            classes: { paper: classes.menuPaper },
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }}
                        inputProps={{
                            className: classes.input
                        }}
                        className={classes.select}
                        onChange={(event) => onInput(index, event)}
                    >
                        <MenuItem value={'Adult'}>Adult</MenuItem>
                        <MenuItem value={'Child'}>Child</MenuItem>
                    </Select>
                </FormControl>
                {/* <div className="nice-select" tabIndex="0">
            <span className="current">Adult</span>
            <ul className="list">
                <li data-value="volvo" className="option selected">Adult</li>
            </ul>
        </div> */}
            </div>
            <div className='col-3'>
                Total Amount:
                <div
                    className='guest-input-amount'
                    onClick={handleIconClick}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                    {`$${field.totalAmount}`}
                </div>

            </div>
            <div className="col-1">
                <FontAwesomeIcon icon={faNotesMedical} className="notesIcon" onClick={() => onAdd(index)} />
            </div>
            {showSalesItemComponent &&
                <CustomDropdown index = {index} salesItems={salesItems} closeDropdown={handleIconClick} />

            }


        </div>
    )
}

export default DynamicGuestRow;