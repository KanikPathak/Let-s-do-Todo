import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStop, FaPlay, FaPause } from 'react-icons/fa';
import { GiTeapotLeaves } from 'react-icons/gi';
import './PomodoroTimer.css';

export default function PomodoroTimer({ pomodoroTime, isPomodoroActive, setIsPomodoroActive, setPomodoroTime }) {
  const intervalRef = useRef(null);
  const [isBreak, setIsBreak] = useState(false);
  const [quote, setQuote] = useState(
    "The Pomodoro Technique uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks."
  );

  useEffect(() => {
    if (isPomodoroActive && pomodoroTime > 0) {
      intervalRef.current = setInterval(() => {
        setPomodoroTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsPomodoroActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isPomodoroActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPomodoroActive, pomodoroTime, setPomodoroTime, setIsPomodoroActive]);

  useEffect(() => {
    const quotes = isBreak
      ? ["Take a short break and enjoy your tea! It's important to rest between focused work sessions."]
      : [
          "Stay focused and keep pushing forward!",
          "Small steps every day lead to big accomplishments.",
          "Your productivity is a measure of your dedication.",
          "Every task completed is a step towards your goal.",
          "Consistency is the key to success.",
        ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, [isBreak]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleStartPause = () => setIsPomodoroActive(!isPomodoroActive);

  const handleStop = () => {
    setIsPomodoroActive(false);
    setPomodoroTime(25 * 60);
    setIsBreak(false);
  };

  const handleReset = () => {
    setIsPomodoroActive(false);
    setPomodoroTime(isBreak ? 5 * 60 : 25 * 60);
  };

  const handleTeaBreak = () => {
    setIsPomodoroActive(false);
    setPomodoroTime(5 * 60);
    setIsBreak(!isBreak);
  };

  return (
    <motion.div
      className="pomodoro-timer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="pomodoro-title">{isBreak ? 'Tea Break' : 'Pomodoro Timer'}</h2>
      <motion.div
        className={`pomodoro-display ${isPomodoroActive ? 'active' : ''}`}
        animate={{ scale: isPomodoroActive ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 1, repeat: isPomodoroActive ? Infinity : 0 }}
      >
        {formatTime(pomodoroTime)}
      </motion.div>
      <div className="pomodoro-controls">
        <motion.button
          onClick={handleStartPause}
          className="pomodoro-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPomodoroActive ? <FaPause /> : <FaPlay />}
        </motion.button>
        <motion.button
          onClick={handleStop}
          className="pomodoro-button stop-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaStop />
        </motion.button>
        <motion.button
          onClick={handleReset}
          className="pomodoro-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
        <motion.button
          onClick={handleTeaBreak}
          className="pomodoro-button tea-break-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <GiTeapotLeaves /> {isBreak ? 'End Break' : 'Tea Break'}
        </motion.button>
      </div>
      <p className="pomodoro-info">{quote}</p>
    </motion.div>
  );
}
