import React, { useState } from 'react';

import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';



export default function Form(props){

  const [ student, setStudent ] = useState(props.student || "");
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);
  const [ error, setError ] = useState("")


  //helper to reset form inputs
  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setError(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();    
  };


  //form validation helper
  const validate = () => {
    if (student === ""){
      setError("student name cannot be blank");
      return;
    }
    if (interviewer === null){
      setError("please select an interviewer");
      return;
    }
    props.onSave(student, interviewer);
  }

  return(

    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">

    <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
        data-testid="student-name-input"
      />
    </form>
    
    <section className="appointment__validation">{error}</section>
    
    <InterviewerList onChange={(id) => setInterviewer(id)} interviewers={props.interviewers} value={interviewer}/>
    </section>

    <section className="appointment__card-right">
    <section className="appointment__actions">
      
      <Button danger onClick={() => cancel()}>Cancel</Button>
      <Button confirm onClick={() => validate(student, interviewer)}>Save</Button>
    
    </section>
    </section>
    </main>

  )
}