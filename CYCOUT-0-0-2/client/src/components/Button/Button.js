import React from "react";
import './Button.css';
import { Link } from 'react-router-dom';

const style_set = ['btn--primary', 'btn--outline'];

const size_set = ['btn--medium', 'btn--large'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const switchButtonStyle = style_set.includes(buttonStyle)
    ? buttonStyle
    : style_set[0];

    const switchButtonSize = size_set.includes(buttonSize) ? buttonSize : size_set[0];

    return (
      <Link to='/sign-up' className="btn-mobile">
        <button
          className={`btn ${switchButtonStyle} ${switchButtonSize}`}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </Link>
    );
};