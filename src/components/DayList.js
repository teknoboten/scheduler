import React from "react";

import DayListItem from "components/DaylistItem";

//container component for "day" objects provided by the API server
//props.days.map returns an array of dayListObjects that will be automatically rendered as an unordered list

export default function DayList(props){

  return(
    <ul>
      {props.days.map(day => <DayListItem key={day.id} name={day.name} 
      spots={day.spots} selected={day.name === props.value} 
      onChange={props.onChange} />)}
    </ul>
  );
} 


