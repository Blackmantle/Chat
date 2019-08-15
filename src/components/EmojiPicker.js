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
      <div className="emoji__picker">
        <Picker set="emojione" title="Pick your emoji…" onSelect={onSelect} />
      </div>
      <FontAwesomeIcon className="emoji__icon" icon={faLaugh} />
    </div>
  );
}

EmojiPicker.propTypes = {
  onSelect: propTypes.func.isRequired,
};

export default EmojiPicker;
