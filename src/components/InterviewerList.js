import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "./InterviewerListItem";
import 'components/InterviewerList.scss';

function InterviewerList(props){

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

  InterviewerList.propTypes = {
    interviewers: PropTypes.array
  };

  export default InterviewerList;