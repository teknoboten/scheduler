import React from "react";
import classNames from "classnames";

import 'components/InterviewerListItem.scss';


export default function InterviewerListItem(props) {

//conditionally apply CSS classes based on truthy / falsy prop values
  let interviewerClass = classNames( 'interviewers__item', {' interviewers__item--selected': props.selected })

  return(

    <li className={interviewerClass} onClick={props.onChange} >
      <img className="interviewers__item-image" src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>

  )}


