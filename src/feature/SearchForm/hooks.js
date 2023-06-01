import { useEffect } from 'react';
export const useClickout = (ref, callback) => {
  useEffect(() => {
    document.addEventListener('mousedown', callback);
    return () => {
      document.removeEventListener('mousedown', callback);
    };
  }, [ref, callback]);
};
