import React, { useState } from 'react';

import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props){

  const [ student, setStudent ] = useState(props.student || "");
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);

  const reset = () => setStudent("").setInterviewer(null);
  const cancel = () => props.onCancel().reset();

  return(
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setStudent(event.target.value)}
        
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList onChange={(id) => setInterviewer(id)} interviewers={props.interviewers} value={interviewer}/>
    {/* <InterviewerList onChange={props.setInterviewer} interviewers={props.interviewers}/> */}
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => cancel()}>Cancel</Button>
      <Button confirm onClick={() => props.onSave}>Save</Button>
    </section>
  </section>
</main>

  )
}