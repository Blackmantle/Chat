import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh } from '@fortawesome/free-regular-svg-icons';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import './EmojiPicker.sass';

function EmojiPicker({ onSelect }) {
  return (
    <div className="emoji">
      <form className="emoji__picker">
        <Picker set="emojione" title="Pick your emoji…" onSelect={onSelect} />
      </form>
      <FontAwesomeIcon className="emoji__icon" icon={faLaugh} />
    </div>
  );
}

EmojiPicker.propTypes = {
  onSelect: propTypes.func.isRequired,
};

export default EmojiPicker;
