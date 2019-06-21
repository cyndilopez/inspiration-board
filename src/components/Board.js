import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';



class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
    };
  }

  addCard = (newCard) => {
    console.log(newCard)
    console.log(this.state.cards)
    console.log(this.props.url+this.props.boardName+'/cards')
    axios.post(this.props.url+this.props.boardName+'/cards',newCard)
    .then((response) => {
      let updatedData = this.state.cards;
      updatedData.push(newCard);
      this.setState({cards: updatedData})
    })
    .catch((error)=>{
      console.log(error.message)
    })
  }

  deleteCard = (id) => {
    console.log(this.props.urlCards+id.toString())

    axios.delete(this.props.urlCards+id.toString())
    .then((response) => {
      const index = this.state.cards.findIndex((object) => {
        return object.id===id;
      });
      let updatedData=this.state.cards;
      updatedData.splice(index,1);
      this.setState({cards: updatedData});

    })
    .catch((error) => {
      this.setState({error: error.message});
    })
  }

  generateCards = () => {
    return this.state.cards.map((card) => {
      return (<Card
      key={card.id}
      id={card.id}
      text={card.text}
      emoji={card.emoji}
      deleteCardCallback = {this.deleteCard}
      />)
    })
  }

  componentDidMount() {
    axios.get(this.props.url+this.props.boardName+'/cards')
    .then((response) => {
      console.log(response.data)
      const updatedCards=response.data.map((card) => {
        const newCard = {

          ...card.card,
          emoji: card.card.emoji==null ? "" : card.card.emoji
        }
         
        return newCard
  
      })

      console.log(updatedCards)
      this.setState({cards: updatedCards})

    })
    .catch((error) => {
      this.setState({error: error.message});
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
      <div>
        <NewCardForm addCardCallback={this.addCard}/>
      </div>
      <div className="board">
        {this.generateCards()}
      </div>
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
};

export default Board;
