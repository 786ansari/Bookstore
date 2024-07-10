import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default  function Button (props)  {
  const { onClick,label } = props
  return (
    <button className="btn-primary" onClick={onClick} >{label}</button>
     
  );
};