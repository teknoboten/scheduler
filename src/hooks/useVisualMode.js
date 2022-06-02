
import { useState } from 'react';



export default function useVisualMode(initialMODE) {

  const [ mode, setMode ] = useState(initialMODE)
  const [ history, setHistory ] = useState([initialMODE])

  const transition = (newMode, replace = false) => {

    if (replace) { 
      
      history.pop()
      history.push(newMode)
      setMode(newMode)

    } else {

      history.push(newMode)
      setMode(newMode);
    
    }
  }
  
  const back = () => {

    if (history.length > 1){

      history.pop()
      setMode(history.slice(-1)[0])

    } else {
      
      setMode(history[0])
    
    }
  }
  
  return { mode, transition, back };

}

