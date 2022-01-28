import React from 'react';
import './SkeletonElement.global.css'

const SkeletonElement = ({ type, width, height, children }) => {
  const classes = `skeleton ${ type }`
  const mystyle = {
    width: width,
    height: height
  };

  return (
    <div className={classes} style={mystyle}>{ children }</div>
  );
};

export default SkeletonElement;
