import React from 'react';
import { useState, useEffect } from 'react';
import { createNewContest1 } from '../../services/createNewContest';

const Timer = (props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState()

  const getTime = () => {
    const time = props.expirationDate - Date.now();
    setTime(time)
    
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(props.expirationDate), 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    if (time < 0){
      createNewContest1();
    }
  }, [minutes]);

  return (
    <div className="timer">
      {hours >= 0 ? `${hours} hours ` : ''}{minutes >= 0 ? `${minutes} mins ` : ''}{seconds >= 0 ? `${seconds} sec ` : ''}
    </div>
  );
};

export default Timer;