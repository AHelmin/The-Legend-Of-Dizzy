export const GameOver = ({ onStartClick }) => {
    return (
      <div>
        <button onClick={onStartClick}>
          Go Home
        </button>
      </div>
    );
  };

  /*
What this needs to do top to bottom:

- Display finishing message

- Add all three scores from state 
and push that number into the scores array in User

- Get all users

- Parse through all user scores, grab the top five
and post to HighScores

- Provide button that links to a contact page

- Provide a button to go Home

  */