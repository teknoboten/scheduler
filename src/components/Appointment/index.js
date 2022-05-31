import React from 'react';

import useVisualMode from 'hooks/useVisualMode';

import "components/Appointment/styles.scss";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM"

export default function Appointment(props){

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer){
    transition(SAVE);
    const interview = { student: name, interviewer };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  
  function cancel(id){
    transition(DELETE);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  function confirmCancel(id){
    transition(CONFIRM);
  }



  return (

    <article className="appointment">
    
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onCancel={confirmCancel}/> }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVE && <Status message={"Saving..."} />}
      {mode === DELETE && <Status message={"Deleting..."}/>}
      {mode === CONFIRM && <Confirm message={"Are you really really sure??"} onConfirm={cancel} onCancel={back} />}
  
    </article>

  )
}



