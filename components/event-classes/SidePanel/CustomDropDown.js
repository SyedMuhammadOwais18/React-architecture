import SalesItem from "./SalesItem";
import React from 'react';

const CustomDropdown = ({ index,salesItems, closeDropdown }) => {
    return (
        <div className="custom-dropdown">
            <SalesItem items={salesItems} index = {index}/>
            <div onClick={closeDropdown} style = {{cursor:'pointer'}}>X</div>
        </div>
    );
};

export default CustomDropdown;