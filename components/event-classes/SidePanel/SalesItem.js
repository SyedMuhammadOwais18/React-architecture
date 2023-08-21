import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { eventReservationActions, reservationPanelActions } from '../../../redux-store/index';

const SalesItem = ({ index, items}) => {
    console.log("Item : ", items);
    const dispatch = useDispatch();
    // const dispatch = useDispatch();
    const mandatoryItems = items.filter(item => item.headCount);
    const optionalItems = items.filter(item => !item.headCount);
    const [selectedMandatoryItem, setSelectedMandatoryItem] = useState(null);
    const [selectedOptionalItems, setSelectedOptionalItems] = useState([]);

    const handleSelectMandatoryItem = (saleItemId) => {
        // setSelectedMandatoryItem(itemId);
        dispatch(eventReservationActions.addItemToAnAttendee({index:index , saleItemId:saleItemId}))
        // calculateTotal();
    };

    const handleOptionalItemQuantityChange = (saleItemId, quantity) => {
        dispatch(eventReservationActions.updateItemQuantity({index,saleItemId,quantity}))
        // calculateTotal();
    };

    return (
        <>
            <div className='col-8'>
                <h4>MandatoryItems</h4>
                {mandatoryItems.map((item) => (
                    item.salesItemCharges.map((charge, index) => (
                        <div key={item.saleItemId + '-' + index}>
                            <input type="radio" name="mandatory-item" value={item.saleItemId} onChange={() => handleSelectMandatoryItem(item.saleItemId)} />
                            <span>{item.saleItemName} - {charge.chargeFor}: {`$${charge.price}`}</span>
                        </div>
                    ))
                ))}

            </div>
            <div className='col-8'>
                <h4>Optional Items</h4>
                {optionalItems.map((item) => (
                    item.salesItemCharges.map((charge, index) => (
                        <div key={item.saleItemId + '-' + index}>
                            <span>{item.saleItemName} - {charge.chargeFor}: {`$${charge.price}`}</span>
                            <input type="number" name={`optional-item-${item.saleItemId}`} min="0" value={selectedOptionalItems} onChange={(e) => handleOptionalItemQuantityChange(item.saleItemId, e.target.value)} />
                        </div>
                    ))
                ))}
            </div>
        </>
    );
}

export default SalesItem;