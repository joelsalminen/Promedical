import React from 'react';

import './CheckBox.css'

const CheckBox = (props) => {
	const { checked, label } = props;

	return(
		<div className="CheckBox">
			<button
				className="CheckBox__button"
				onClick={props.toggleCheckBox}
			>
				{checked ? (
					<p>O</p>
				):(
					<p style={{visibility: 'hidden'}}>x</p>
				)}
			</button>

			{label && 
				<p className="CheckBox__label">{label}</p>
			}
			
		</div>
	);

}

export default CheckBox;