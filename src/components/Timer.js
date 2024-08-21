import React, { useEffect, useState } from 'react';

function Timer({ isGameActive, setTime }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;

    if (isGameActive) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isGameActive]);

  useEffect(() => {
    setTime(seconds);
  }, [seconds, setTime]);

  return (
    <div className="timer">
      <h2 style={{margin:0}}>Time: {seconds} seconds</h2>
    </div>
  );
}

export default Timer;
