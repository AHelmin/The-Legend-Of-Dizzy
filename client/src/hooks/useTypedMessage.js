import { wait } from '../shared';
import { useEffect, useState } from 'react';

export const useTypedMessage = message => {
  const [typedMessage, setTypedMessage] = useState('');
  let typingDone = false

  useEffect(() => {
    setTypedMessage('');

    if (message.length) {
      (async () => {
        let visibleMessage = '';
        for (let i = 0; i < message.length; i++) {
          await wait(50);

          visibleMessage = visibleMessage + message[i];

          setTypedMessage(visibleMessage);
        }
      })();
    } 
  }, [message]);
  if (typedMessage.length === message.length) {
    typingDone = true;
  }

  return [typedMessage, typingDone];
};
