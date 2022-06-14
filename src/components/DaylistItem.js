import React from "react";
import classNames from "classnames";

import 'components/DayListItem.scss';


//helper function used to dynamically generate correct 'spots remaining' string for each dayListItem
const formatSpots = (spots) => {
  if (spots === 0 ) { return 'no spots remaining' };
  if (spots === 1) { return '1 spot remaining' };
  if (spots >= 2) { return `${spots} spots remaining` }
}


export default function DayListItem(props) {

//conditionally apply CSS classes based on truthy / falsy prop values
  let dayClass = classNames( 'day-list__item', {
    ' day-list__item--selected': props.selected,
    ' day-list__item--full': props.spots === 0 ? true : false
    })

  return (
    <li onClick={() => props.onChange(props.name)} className={dayClass} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

