import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview } from '../helpers/selectors'

import axios from 'axios';


const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];




export default function Application(props) {

  const [ state, setState ] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {}});
  // const [ interviewer, setInterviewer ] = useState('');

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({...state, appointments});
  }




  
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((apt) => {
    const interview = getInterview(state, apt.interview);
    // return( <Appointment key={apt.id} id={apt.id} time={apt.time} interview={interview} bookInterview={bookInterview}/>)
    return( <Appointment key={apt.id} id={apt.id} time={apt.time} interview={interview} bookInterview={bookInterview} interviewers={interviewers}/>)
  });

 
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])



  return (
    <main className="layout">
      <section className="sidebar">

    <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
    <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
    <DayList days={state.days} value={state.day} onChange={setDay}/>
    {/* <InterviewerList value={interviewer} interviewers={interviewers} onChange={setInterviewer} /> */}
    </nav>
    <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>

      </section>
      <section className="schedule">

        {/* {dailyAppointments.map(apt => <Appointment key={apt.id} {...apt} />)} */}
        {schedule}
        <Appointment key="last" time="5pm"/>

      </section>
    </main>
  );
}
