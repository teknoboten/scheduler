import React from "react";
// import classNames from "classnames";

import InterviewerListItem from "./InterviewerListItem";
import 'components/InterviewerList.scss';

export default function InterviewerList(props){

return(
  <ul>

  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    
    {props.interviewers.map(int => <InterviewerListItem 
    key={int.id} 
    name={int.name}   
    avatar={int.avatar} 
    selected={int.id === props.value}
    onChange={() => props.onChange(int.id)} /> )}
  
  </ul>
  </section>

  </ul>
  )}


  // onChange={() => props.onChange(int.id)} /> )}