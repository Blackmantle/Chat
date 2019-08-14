import React from 'react';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Progress.sass';

function Progress({ text }) {
  return (
    <div className="progress">
      <CircularProgress />
      <strong className="progress__text">{text}</strong>
    </div>
  );
}

Progress.propTypes = {
  text: propTypes.string.isRequired,
};

export default Progress;
