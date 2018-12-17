import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

//https://inspiration-board.herokuapp.com/boards/Laura/cards?text=hi &emoji=heart_eyes

const URL = 'https://inspiration-board.herokuapp.com/boards/Laura/cards';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
    };
  }

  componentDidMount() {

    axios.get(URL)
      .then((response) => {
        const cards = response.data.map((card) => {
          console.log(card.card);
            const newCard = {
              ...card.card,
            }
          return newCard
        })
        this.setState({
          cards: cards,
        });
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({
          errorMessage: error.message,
        });
      });

  }

  addCard = (newCard) => {
    const apiPayload = {
      ...newCard,
    };
    axios.post(URL, apiPayload)
      .then( (response) => {
        console.log(response)
        const myNewCard = response.data;
        newCard.id = myNewCard.id

        const {cards} = this.state;

        cards.push(newCard);

        this.setState({
          cards,
          errorMessage: 'Card Added',
        });

      })
      .catch( (error) => {
        this.setState({
          errorMessage: `Failure ${error.message}`,
        })
      });
  }

  removeCard = (cardId) => {
    let URL_delete = "https://inspiration-board.herokuapp.com/cards/" + cardId
    axios.delete(URL_delete)
       .then((response) => { //if it finishes successfully, this executes
         let deleteIndex = -1;
         const cards = [...this.state.cards];

         cards.forEach((card, index) => {
           if (cardId === card.id) {
             deleteIndex = index;
           }
         });

         cards.splice(deleteIndex, 1); //remove one element at deleteIndex

         this.setState({
           cards: cards,
         });
       })
       .catch((error) => {
         this.setState({
           errorMessage: `Failure ${error.message}`,
         })
       });

  }

  render() {
    console.log(this.state.cards)

  const cards = this.state.cards.map((card) => {
    let emoji = ""
      if (card.emoji == null) {
        emoji = undefined
      } else {
        emoji = card.emoji
      }
      return (
        <Card text = {card.text} emoji= {emoji} deleteCardCallback={this.removeCard} id={card.id}
/>
      )
    });
    return (
      <div>
        {cards}
        <section>
        <NewCardForm addCardCallback={this.addCard} />
        </section>
      </div>
    )
  }

}

Board.propTypes = {

};

export default Board;
