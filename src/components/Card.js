import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {

  render() {
    let icon = this.props.emoji;
    if (icon !== undefined) {
      icon = emoji.getUnicode(icon);
    }
    console.log(icon)
    return (
      <div className="card">
        <div className="card__content">
        {this.props.text}
        <section className="card__content-text">

        </section>
        <section className="card__content-emoji">
        {icon}
        </section>
        <button
          onClick={() => this.props.deleteCardCallback(this.props.id)}
          type="button"
          className="card__delete"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
      </div>
    )
  }
}

Card.propTypes = {

};

export default Card;
