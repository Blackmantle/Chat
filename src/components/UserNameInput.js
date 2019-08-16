import React from 'react';
import useGlobal from '../store';
import './UserNameInput.sass';

function UserNameInput() {
  const [globalState, globalActions] = useGlobal();

  function handleChange(e) {
    const { value } = e.target;
    if (value.length <= 30) {
      globalActions.changeUserName(e.target.value);
    }
  }

  return (
    <div className="user-name-input">
      <input
        className="user-name-input__input"
        value={globalState.userName}
        onChange={handleChange}
        placeholder="Введите ваше имя..."
      />
    </div>
  );
}

export default UserNameInput;
