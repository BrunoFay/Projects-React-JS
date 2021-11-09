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
      trunfoFilter } = this.props;
    return (

      trunfoFilter ? deckCards
        .filter((card) => card.trunfo)
        .map((card) => (
          <div key={ card.name } >
            <Card
              cardName={ card.name }
              cardDescription={ card.description }
              cardAttr1={ card.cardValues.attr1 }
              cardAttr2={ card.cardValues.attr2 }
              cardAttr3={ card.cardValues.attr3 }
              cardImage={ card.image }
              cardRare={ card.rarity }
              cardTrunfo={ card.trunfo }
              deckCards={ card.deckCards }
              removeCard={ this.removeCard }
            />
            <button
              type="submit"
              data-testid="delete-button"
              onClick={ () => removeCard(card.name, card.trunfo) }
            >
              Excluir
            </button>

          </div>))
        : deckCards.filter((card) => card.name
          .includes(filterByName))
          .filter((card) => {
            if (filterByRarity === 'normal') {
              return card.rarity === 'normal';
            }
            if (filterByRarity === 'raro') {
              return card.rarity === 'raro';
            }
            if (filterByRarity === 'muito raro') {
              return card.rarity === 'muito raro';
            }
            return card;
          }).map((card) => (
            <div key={ card.name }>
              <Card
                cardName={ card.name }
                cardDescription={ card.description }
                cardAttr1={ card.cardValues.attr1 }
                cardAttr2={ card.cardValues.attr2 }
                cardAttr3={ card.cardValues.attr3 }
                cardImage={ card.image }
                cardRare={ card.rarity }
                cardTrunfo={ card.trunfo }
                deckCards={ card.deckCards }
                removeCard={ this.removeCard }
              />
              <button
                type="submit"
                data-testid="delete-button"
                onClick={ () => removeCard(card.name, card.trunfo) }
              >
                Excluir
              </button>
            </div>
          ))

    );
  }
}
Cards.propTypes = {
  removeCard: PropTypes.func,
  deckCards: PropTypes.object,
}.isRequired;
