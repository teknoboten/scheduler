import React from 'react';

import "components/Appointment/styles.scss";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';




export default function Appointment(props){

  return (

    <article className="appointment">
    
      <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : < Empty />}
  
    </article>

  )
}



// The <Show> component should accept the following props:

// student:String eg. "Lydia Miller-Jones"
// interviewer:Object we can use the interview object that already exists in stories/index.js for this
// onEdit:Function to be called when the user clicks the Edit button
// onDelete:Function to be called when the user clicks the Delete button

//appointment needs to pass ^^ those to the show component

//student and interviewer data live in the application 
//application needs to pass those props to appointment 