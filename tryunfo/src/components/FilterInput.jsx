import React from 'react';
import PropTypes from 'prop-types';
// referencia pega com o colega bruno melo https://github.com/tryber/sd-016-b-project-tryunfo/pull/56/commits/2f1ec8550175ccdd6dfb9423739bd5265f9ace6c

export default class Filtred extends React.Component {
  render() {
    const {
      filterCardName,
      filterCardRarity,
      filterCardByTrunfo,
      trunfoFilter } = this.props;
    return (
      <div className='filters'>
        <div>
          <label htmlFor="search-filter">
            Deck Filter
            <input
              type="text"
              data-testid="name-filter"
              id="input-filter"
              onChange={ filterCardName }
              disabled={ trunfoFilter }
            />
          </label>
          
        </div>

        <label htmlFor="filter-rarity">
          <select
            id="filter-rarity"
            onChange={ filterCardRarity }
            data-testid="rare-filter"
            disabled={ trunfoFilter }
          >
            <option>Todas</option>
            <option>Normal</option>
            <option>Raro</option>
            <option>Muito Raro</option>
          </select>
        </label>
        <label htmlFor="trunfo-filter">
          Super Trunfo 
          <input
            type="checkbox"
            id="trunfo-filter"
            data-testid="trunfo-filter"
            onChange={ filterCardByTrunfo }
          />
        </label>
      </div>
    );
  }
}

Filtred.propTypes = {
  filterCardName: PropTypes.func,
  filterCardRarity: PropTypes.func,
  filterTrunfo: PropTypes.func,
  trunfoFilter: PropTypes.bool,
}.isRequired;
