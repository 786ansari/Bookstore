import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default  function DatePickerComponet (props)  {
  const { onChange, selected } = props
  return (
    <DatePicker 
    selected={selected} 
    onChange={(date) => onChange(date)}
    // minDate={}
    
    />
     
  );
};