import React from 'react';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  render() {
    const {
      cardTrunfo,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardName,
      cardImage,
      cardRare,
      id } = this.props;

    return (

      <section className='card'>
        <span className='id'>{id}</span>
        <span data-testid="name-card" className="title">{cardName.toUpperCase()}</span>
        <img
          data-testid="image-card"
          src={cardImage}
          alt={cardName}
          name="cardImage"
          className='card-image'
        />
        <div className='card-rarity'>
          <span data-testid="rare-card" name="cardRare">{cardRare}</span>
          {cardTrunfo && <div data-testid="trunfo-card" id='card-trunfo'>Super Trunfo</div>}
        </div>
        <p data-testid="description-card" name="cardDescription" className='card-desc'>{cardDescription}</p>
        <div className='icons'>
          <label>💥</label>
          <label>🎯</label>
          <label>⚡</label>
        </div>
        <div className='card-atts'>
          <span data-testid="attr1-card" name="cardAttr1" className='card-att'>{cardAttr1}</span>
          <span data-testid="attr2-card" name="cardAttr2" className='card-att'>{cardAttr2}</span>
          <span data-testid="attr3-card" name="cardAttr3" className='card-att'>{cardAttr3}</span>
        </div>
        {/* referencia para verificar o estado de cardTrunfo https://pt-br.reactjs.org/docs/conditional-rendering.html */}

      </section>

    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}.isRequired;
