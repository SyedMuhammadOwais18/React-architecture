import DisplayResultComponent from "./DisplayResultComponent";
import FilterComponent from "./FilterComponent";
import SearchComponent from "./SearchComponent";
import React from 'react';


const Header = (props) => {
    return (<div className="course-bar-up-area">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className={`course-main-wrapper hidden-xs`}>
                        <FilterComponent onClick={props.onClick} onClearAll={props.onClearAll} />
                        <SearchComponent onSearch={props.onSearch} showSearchOverlayHandler={props.showSearchOverlayHandler} data={props.data} show={props.show} />
                        <DisplayResultComponent filterData={props.filterData} totalData={props.totalData} />
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Header;