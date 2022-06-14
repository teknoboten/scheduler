import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {

//conditionally apply CSS classes based on truthy / falsy prop values
   const buttonClass = classNames( 'button', {
      ' button--confirm': props.confirm,
      ' button--danger': props.danger
   });

   return (
   <button 
   className={buttonClass}
   onClick={props.onClick}
   disabled={props.disabled}
   data-cy="submit"
   >{props.children}
   </button>
   )
 }
 