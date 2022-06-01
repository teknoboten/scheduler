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
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props){

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // const [ student, setStudent ] = useState(props.student || "");
  // const [ interviewer, setInterviewer ] = useState(props.interviewer || null);


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

  function edit(id){
    transition(EDIT);
  }


  return (

    <article className="appointment">
    
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onCancel={confirmCancel} onEdit={edit}/> }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVE && <Status message={"Saving..."} />}
      {mode === DELETE && <Status message={"Deleting..."}/>}
      {mode === CONFIRM && <Confirm message={"Are you really really sure??"} onConfirm={cancel} onCancel={back} />}
      {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} student={props.interview.student} onSave={save} onCancel={back}/>}
    
    </article>

  )
}



