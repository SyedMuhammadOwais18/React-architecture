import React from 'react';
import { useNavigate } from 'react-router-dom';

const TabButtons = ({ switchTab, activeTab }) => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    }

    return (
        <div className="tab-buttons">
            <button type="button" className="btn btn-success btn-custom-font back-btn" onClick={handleBackClick}>Back</button>
            <div className="tab-row">
                <button className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`}
                    onClick={() => switchTab('tab1')}> Info
                </button>
                <button className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`}
                    onClick={() => switchTab('tab2')}> Details
                </button>
            </div>
        </div>
    );
}

export default TabButtons;