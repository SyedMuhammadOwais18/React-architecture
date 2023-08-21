import React from 'react';
import { useTimer } from 'react-timer-hook';
function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
  return (
    <>
      <span id="timer">{minutes} : {seconds}</span>
    </>
  );
}
const TimerComponent = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  return (
    <>
      <MyTimer expiryTimestamp={time} />
    </>
  );
}
export default TimerComponent;