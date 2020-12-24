import React from 'react';
import Logo from '../../asset/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={Logo} />
    </div>
);

export default logo;