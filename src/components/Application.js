import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";
// import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'

import axios from 'axios';

export default function Application(props) {

  const [ state, setState ] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {}});

  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((apt) => {
    const interview = getInterview(state, apt.interview);
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

  function bookInterview(id, interview) {

    const appointment = {...state.appointments[id], interview: {...interview} };
    const appointments = {...state.appointments, [id]: appointment };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => { setState(prev =>{ return {...prev, appointments}});
    })
  }

  return (
    <main className="layout">
      <section className="sidebar">

    <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
    <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
    <DayList days={state.days} value={state.day} onChange={setDay}/>
    </nav>
    <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>

      </section>
      <section className="schedule">

        {schedule}
        <Appointment key="last" time="5pm"/>

      </section>
    </main>
  );
}
