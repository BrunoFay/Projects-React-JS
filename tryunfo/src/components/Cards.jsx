import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
// referencia de criar um componente foi feita apos observar como os colegas estavam fazendo na mentoria, fazer direto no app.js nao estava dando o resultado esperado
export default class Cards extends React.Component {
  render() {
    const {
      deckCards,
      removeCard,
      filterByName,
      filterByRarity,
      trunfoFilter,
    } = this.props;
    return (

      trunfoFilter ? deckCards
        .filter((card) => card.trunfo)
        .map((card) => (
          <div key={card.id} className='cards-deck' >
            <Card
              cardName={card.name}
              cardDescription={card.description}
              cardAttr1={card.cardValues.attr1}
              cardAttr2={card.cardValues.attr2}
              cardAttr3={card.cardValues.attr3}
              cardImage={card.image}
              cardRare={card.rarity}
              cardTrunfo={card.trunfo}
              deckCards={card.deckCards}
              removeCard={this.removeCard}
              className='cards-deck'
            />
            <button
              type="submit"
              data-testid="delete-button"
              onClick={() => removeCard(card.name, card.trunfo)}
            >
              Excluir
            </button>

          </div>))
        : deckCards.filter((card) => card.name
          .includes(filterByName))
          .filter((card) => {
            if (filterByRarity === 'Normal') {
              return card.rarity === 'Normal';
            }
            if (filterByRarity === 'Raro') {
              return card.rarity === 'Raro';
            }
            if (filterByRarity === 'Muito Raro') {
              return card.rarity === 'Muito Raro';
            }
            return card;
          }).map((card) => (
            <div key={card.id} className='cards-deck'>
              <Card
                cardName={card.name}
                cardDescription={card.description}
                cardAttr1={card.cardValues.attr1}
                cardAttr2={card.cardValues.attr2}
                cardAttr3={card.cardValues.attr3}
                cardImage={card.image}
                cardRare={card.rarity}
                cardTrunfo={card.trunfo}
                deckCards={card.deckCards}
                removeCard={this.removeCard}
              />
              <div className='wrap'>
                <button
                className='btn-remove'
                  type="submit"
                  data-testid="delete-button"
                  onClick={() => removeCard(card.name, card.trunfo)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))

    );
  }
}
Cards.propTypes = {
  removeCard: PropTypes.func,
  deckCards: PropTypes.object,
}.isRequired;
