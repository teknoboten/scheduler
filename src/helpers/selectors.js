// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };


export function getInterview(state, interview) {

  if (!interview){
    return null;
  }

  return { ...interview, interviewer: {...state.interviewers[interview.interviewer]} }

}



export function getAppointmentsForDay(state, day) {

  let result = [];

//filter state.days.name to find the one that matches the day input 
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


// console.log(getInterview(state, state.appointments["1"].interview));