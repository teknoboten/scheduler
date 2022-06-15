import React from "react";

import "components/Application.scss";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'
import useApplicationData from "hooks/useApplicationData";
import DayList from "./DayList";
import Appointment from "./Appointment";




export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  const interviewers = getInterviewersForDay(state, state.day);

//map over appointment data from API to create an array of appointment components
  const schedule = getAppointmentsForDay(state, state.day).map((apt) => {
    return ( 
    <Appointment key={apt.id} {...apt} interviewers={interviewers} interview={getInterview(state, apt.interview)} 
    bookInterview={bookInterview} cancelInterview={cancelInterview}/>)
  });

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
