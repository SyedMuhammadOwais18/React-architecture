import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TimerComponent from "./../../components/event-classes/TimerComponent";
import DrawerComponent from "./../../components/event-classes/DrawerComponent";
import RegisterScreenMemberComponent from "./../../components/event-classes/RegisterScreenMemberComponent";
import RegisterScreenCardComponent from "./../../components/event-classes/RegisterScreenCardComponent";
import SearchComponent from "./../../components/event-classes/SearchComponent";
const useStyles = makeStyles((theme) => ({
}));
const RegisterScreen = (props) => {
	const classes = useStyles();
	const [drawer, setDrawer] = useState(false);
	const showOverlay = false;
	const toggleDrawer = () => {
		setDrawer((prevDrawer) => !prevDrawer);
	};
	//for fetching css class on click on close button
	//data passing from child to parent
	const onGetCloseClassHandler = (currentState) => {
		setDrawer(!currentState);
	}
	const showSearchOverlayHandler = () => {
		props.handleShowOverlay(!showOverlay);
	}
	return (
		<>
			{
				<>
					<div id="fade-wrapper"></div>
					<div className="cartmini__area">
						<div className={drawer ? 'cartmini__wrapper sc2 opened' : 'cartmini__wrapper sc2'} id="#sc2">
							{drawer && <DrawerComponent toggle={drawer} onGetCloseClass={onGetCloseClassHandler} />}
						</div>
					</div>
				</>
			}
			<div className="row">
				<div className="col-xl-9">
					<SearchComponent showSearchOverlayHandler={showSearchOverlayHandler} />
					<button type="button" className="btn btn-success btn-custom-font back-btn">Back</button>
				</div>
				<div className="col-xl-2 text-right">
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-xl-4 col-lg-4">
					<div className="section-title mb-20">
						<h2>
							Registration opens in
							<TimerComponent />
						</h2>
					</div>
				</div>
			</div>
			<div className="academic-courses-area p-relative pt-20">
				<img className="academic-shape-2" src="/o/northstar-react-portlet/images/default-register-screen-background-image.png" alt="shape" />
				<div className="container-fluid">
					<div className="row">
						<div className="col-xl-9 col-lg-9 col-md-6 ">
							<div className="row">
								<RegisterScreenMemberComponent member={true} name={"Bob Johnson"} identification={"Member"} imageUrl={"/o/northstar-react-portlet/images/default-member-image.png"} />
								<RegisterScreenMemberComponent member={false} name={"Sam Johnson"} identification={"Dependent"} imageUrl={"/o/northstar-react-portlet/images/default-member-image.png"} />
							</div>
						</div>
						<div className="col-xl-3 col-lg-3 col-md-6">
							<div className="product-showcase sc2">
								<div className="section-title mb-10">
									<h4 className="register-screen-card-header">Classes you may be interested in</h4>
								</div>
								<RegisterScreenCardComponent />
								<RegisterScreenCardComponent />
								<RegisterScreenCardComponent />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default RegisterScreen;