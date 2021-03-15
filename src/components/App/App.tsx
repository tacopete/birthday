import React, { useState, useEffect, useRef, ReactElement } from 'react';
import ComfyJS from 'comfy.js';

import config from '../../config';

import { BirthdayMessage } from '../../types';

import '../../styles/main.css';
import styles from './App.css';

const App = (): ReactElement => {
  const [birthdayMessages, setBirthdayMessages] = useState<BirthdayMessage[]>([]);

  const timers = useRef<number[]>([]);

  useEffect(() => {
    ComfyJS.Init(config.CHANNEL_NAME);
  }, []);

  useEffect(() => {
    ComfyJS.onChat = (user, message) => {
      const formattedUser = user.toLowerCase();

      if (
        config.TRIGGER_MESSAGES.some((triggerMessage) => message.toLowerCase().includes(triggerMessage)) &&
        birthdayMessages.every((birthdayMessage) => birthdayMessage.user !== formattedUser)
      ) {
        const getRandomNumberInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getFontSize = () => {
          const messageLength = message.length;
          if (messageLength < 20) {
            return '4.8rem';
          }
          if (messageLength < 40) {
            return '4.0rem';
          }
          if (messageLength < 60) {
            return '3.2rem';
          }
          if (messageLength < 80) {
            return '2.8rem';
          }
          if (messageLength < 100) {
            return '2.4rem';
          }
          return '1.8rem';
        };
        const redNumber = getRandomNumberInRange(0, 255);
        const greenNumber = getRandomNumberInRange(0, 255);
        const blueNumber = getRandomNumberInRange(0, 255);
        const fontFamily = config.FONTS[getRandomNumberInRange(0, config.FONTS.length)];
        const fontSize = getFontSize();
        const verticalOffsetLocation = getRandomNumberInRange(0, 1) === 0 ? 'bottom' : 'top';
        const horizontalOffsetLocation = getRandomNumberInRange(0, 1) === 0 ? 'left' : 'right';
        const verticalOffsetDistance = getRandomNumberInRange(0, config.SCREEN_HEIGHT - config.TEXTBOX_HEIGHT);
        const horizonalOffsetDistance = getRandomNumberInRange(0, config.SCREEN_WIDTH - config.TEXTBOX_WIDTH);
        setBirthdayMessages((prevBirthdayMessages) => [
          ...prevBirthdayMessages,
          {
            user: formattedUser,
            text: message,
            style: {
              color: `rgba(${redNumber}, ${greenNumber}, ${blueNumber}, ${config.OPACITY})`,
              fontFamily: `'${fontFamily}', sans-serif`,
              fontSize,
              [verticalOffsetLocation]: verticalOffsetDistance,
              [horizontalOffsetLocation]: horizonalOffsetDistance,
            },
          } as BirthdayMessage,
        ]);
      }
    };
  }, [birthdayMessages]);

  useEffect(() => {
    if (birthdayMessages.length > timers.current.length) {
      timers.current = [
        ...timers.current,
        window.setTimeout(() => {
          console.log(birthdayMessages);
          setBirthdayMessages((prevBirthdayMessages) => prevBirthdayMessages.slice(1, prevBirthdayMessages.length));
          timers.current = timers.current.slice(1, timers.current.length);
        }, config.TEXTBOX_TIMER),
      ];
    }
  }, [birthdayMessages]);

  return (
    <main className={styles.main} style={{ height: config.SCREEN_HEIGHT, width: config.SCREEN_WIDTH }}>
      {birthdayMessages.map((birthdayMessage) => (
        <div
          key={birthdayMessage.user}
          className={styles.textbox}
          style={{
            ...birthdayMessage.style,
            maxHeight: config.TEXTBOX_HEIGHT,
            maxWidth: config.TEXTBOX_WIDTH,
            animationDuration: `${Math.floor(config.TEXTBOX_TIMER / 1000)}s`,
          }}
        >
          <p className={styles.text} style={birthdayMessage.style}>
            {birthdayMessage.text}
          </p>
          <p className={styles.user} style={birthdayMessage.style}>
            -{birthdayMessage.user}
          </p>
        </div>
      ))}
    </main>
  );
};

export default App;
