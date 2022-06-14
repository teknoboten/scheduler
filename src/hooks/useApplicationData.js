import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(){

useEffect(() => {
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  }).catch(err => err.message )
}, [])

const [ state, setState ] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {}});
const setDay = day => setState({ ...state, day });



//refactor with conditionals??
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


function bookInterview(id, interview, isUpdate) {

  const appointment = {...state.appointments[id], interview: {...interview} };
  const appointments = {...state.appointments, [id]: appointment };

  return axios.put(`/api/appointments/${id}`, {interview})
  .then(() => {

  if (isUpdate) {
    setState(prev => { return {...prev, appointments}})} 
    
  else {
    const days = updateSpots("bookInterview");
    setState(prev => { return {...prev, appointments, days}});
  }})
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

