import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';


class Card extends Component {
  
  deleteCard = () => {
      this.props.deleteCardCallback(this.props.id)
  }

  render() {
    return (
      <div className="card">
      <button className="card__delete" onClick={this.deleteCard}>X</button>
      <div className="card__content">
        <p className="card__content-text">{this.props.text}</p>
        <p className="card__content-emoji">{emoji.getUnicode(this.props.emoji)}</p>
      </div>
      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  deleteCardCallback: PropTypes.func.isRequired,
};

export default Card;
