import React from 'react';
import Button from '@material-ui/core/Button';
const ButtonComponent = ({ onClick, children }) => {
	return (
		<Button
			variant="outlined"
			color="primary"
			size="small"
			onClick={onClick}
			className='mb-10'
		>
			{children}
		</Button>
	)
}
export default ButtonComponent;