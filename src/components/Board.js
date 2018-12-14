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

  addPet = (newPet) => {
    const apiPayload = {
      ...newPet,
      img: newPet.image,
      breed: newPet.species,
      owner: '',
    };
    axios.post(URL, apiPayload)
      .then( (response) => {
        const myNewPet = response.data;
        newPet.images = [newPet.image];
        newPet.id = myNewPet.id

        const {petList, masterList} = this.state;

        masterList.push(newPet);

        if (petList !== masterList)
          petList.push(newPet);

        this.setState({
          petList,
          masterList,
          errorMessage: 'Pet Added',
        });

      })
      .catch( (error) => {
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
        <Card text = {card.text} emoji= {emoji}/>
      )
    });
    return (
      <div>
        {cards}
      </div>
    )
  }

}

Board.propTypes = {

};

export default Board;
