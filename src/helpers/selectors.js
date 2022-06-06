export function getInterviewersForDay(state, day){

  let result = [];

  let filtered = (state.days.filter(d => d.name === day));

  if(filtered.length < 1){
    return result;
  } else {

  for (const i in filtered[0].interviewers){
    result.push(state.interviewers[filtered[0].interviewers[i]])
  }
}
return result;
}



export function getInterview(state, interview) {

  if (!interview){
    return null;
  }

  return { ...interview, interviewer: {...state.interviewers[interview.interviewer]} }

}


export function getAppointmentsForDay(state, day) {

  let result = [];

  let filtered = (state.days.filter(d => d.name === day));
    
  if(filtered.length < 1){
    return result;
  } else {

    for (const a in filtered[0].appointments){
      result.push((state.appointments[filtered[0].appointments[a]]))
    }
    return result;
  }
}





