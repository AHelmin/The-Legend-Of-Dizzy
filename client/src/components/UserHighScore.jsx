// UserHighScore.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const UserHighScore = () => {
  const userEmail = useSelector((state) => state.email); // Replace 'email' with the actual key used in your Redux store

  React.useEffect(() => {
    console.log('User Email from Redux State:', userEmail);
  }, [userEmail]);

  return (
    <div>
      {/* You can include additional content or display the email in the component if needed */}
      {/* For now, it just logs the email to the console */}
    </div>
  );
};

export default UserHighScore;
