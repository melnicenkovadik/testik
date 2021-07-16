import React from 'react';
import spinnerLogo from './../../assets/svg/spinner.svg';
import './Spinner.scss';

const Spinner = () => {
    return (
        <img className='Spinner' alt={'Loading...'} src={spinnerLogo}/>
    );
};

export default Spinner;
