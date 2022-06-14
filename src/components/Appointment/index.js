import React from 'react';

import useVisualMode from 'hooks/useVisualMode';

import "components/Appointment/styles.scss";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';


//arguments used by useVisualMode hook
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERR_SAVE = "ERR_SAVE";
const ERR_DELETE = "ERR_DELETE";



export default function Appointment(props){


//useVisualMode is a custom useState hook that allows the appointment component to tansition between visual modes
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



//helper function used when saving / editing an interview
  function save(name, interviewer){
    transition(SAVE);
    const interview = { student: name, interviewer };

//isUpdate tells bookInterview to adjust 'spots remaining' value or not 
    const isUpdate = props.interview;

    props.bookInterview(props.id, interview, isUpdate)
    .then(() => transition(SHOW))

// if error, we pass in the optional second arg true to prevent history ] from getting stale
    .catch(() => transition(ERR_SAVE, true));
  }



  function cancel(id){
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERR_DELETE, true));
  }

  function confirmCancel(id){
    transition(CONFIRM);
  }

  function edit(id){
    transition(EDIT);
  }

  function closeError(){
    back();
  }


  return (

    <article className="appointment" data-testid="appointment">
    
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onCancel={confirmCancel} onEdit={edit}/> }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVE && <Status message={"Saving..."} />}
      {mode === DELETE && <Status message={"Deleting..."}/>}
      {mode === CONFIRM && <Confirm message={"Are you really really sure??"} onConfirm={cancel} onCancel={back} />}
      {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} student={props.interview.student} onSave={save} onCancel={back}/>}
      {mode === ERR_SAVE && <Error message={"Oops, something went wrong...🦕"} onClose={closeError}/>}
      {mode === ERR_DELETE && <Error message={`Sorry, I couldn't delete your interview... 🦖`} onClose={closeError}/>}

    </article>

  )
}



