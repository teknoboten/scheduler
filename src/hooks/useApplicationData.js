import { useState, useEffect } from "react";
import axios from 'axios';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";



export default function useApplicationData(){

useEffect(() => {
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ]).then((all) => {

    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))

  })
}, [])

const [ state, setState ] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {}});
const setDay = day => setState({ ...state, day });


function updateSpots (actionType){

  const days = state.days.map(day => {
    if (day.name === state.day){
      if (actionType === "bookInterview") {
        return { ...day, spots: day.spots - 1 }
      }
      return { ...day, spots: day.spots + 1 }
    }
    return {...day}
  })
  return days;
}



function bookInterview(id, interview) {


  const appointment = {...state.appointments[id], interview: {...interview} };
  const appointments = {...state.appointments, [id]: appointment };

  return axios.put(`/api/appointments/${id}`, {interview})
  .then(() => {

    const days = updateSpots("bookInterview"); //returns a new day object with updated spots

    setState(prev => { 
      return {...prev, appointments, days}
    })
  })
}

function cancelInterview(id) {

  const appointment = {...state.appointments[id], interview: null };
  const appointments = {...state.appointments, [id]: appointment };

  return axios.delete(`/api/appointments/${id}`)
    .then(() => { 
      const days = updateSpots(); 
      setState(prev => {
      return {...state, appointments, days}
  })})
}

return { state, setDay, bookInterview, cancelInterview };

}
