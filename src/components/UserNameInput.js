import React from 'react';
import TextField from '@material-ui/core/TextField';
import useGlobal from '../store';
import './UserNameInput.sass';

function UserNameInput() {
  const [globalState, globalActions] = useGlobal();

  function handleChange(e) {
    globalActions.changeUserName(e.target.value);
  }

  return (
    <div className="user-name-input">
      <TextField
        label="Введите ваше имя..."
        value={globalState.userName}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
    </div>
  );
}

export default UserNameInput;
