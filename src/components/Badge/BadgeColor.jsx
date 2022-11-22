import React from 'react';
import classNames from "classnames";

import './BadgeColor.scss'

const BadgeColor = ({color, onClick, className}) => {
    return (
        <i onClick={onClick} className={classNames('badge', {[`badge--${color}`]: color}, className)}></i>
    );
};

export default BadgeColor;