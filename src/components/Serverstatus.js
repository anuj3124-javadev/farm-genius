import React, { useEffect, useState } from 'react';
import '../styles.css';
import { useAppContext } from '../context/AppContext';

const ServerStatus = () => {
  const { baseURL} = useAppContext();
  const [isOnline, setIsOnline] = useState(null);

  const checkServer = async () => {
    try {
      const response = await fetch(`${baseURL}/public/health`, {
        method: 'GET',
      });

      if (response.ok) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    checkServer(); // Initial check
    const interval = setInterval(checkServer, 5000); // Repeat every 5s
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="status-container">
      <div className={`status-light ${isOnline === null ? '' : isOnline ? 'on' : 'off'}`}></div>
      <h2 className="status-text">
        {isOnline === null
          ? 'Checking server...'
          : isOnline
          ? '✅ Server is ON'
          : '❌ Server is OFF'}
      </h2>
    </div>
  );
};

export default ServerStatus;
