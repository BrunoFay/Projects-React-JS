import React from 'react';
import PropTypes from 'prop-types';

export default class Form extends React.Component {
  render() {
    const { cardName,
      onInputChange,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      hasTrunfo,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      onSaveButtonClick } = this.props;

    return (<>
      <form>
    <h1>Adicionar nova carta </h1>
        <label htmlFor="cardName">
          Nome
        </label>
        <input
          type="text"
          data-testid="name-input"
          id="cardName"
          value={cardName}
          onChange={onInputChange}
          name="cardName"
        />

        <label htmlFor="cardDescri">
          Descrição

        </label>
        <textarea
          data-testid="description-input"
          id="cardDescri"
          value={cardDescription}
          onChange={onInputChange}
          name="cardDescription"
        />

        <section className='attr'>
          <label htmlFor="firstAtribute" className='labels-attr'>
          Força💥
            <input
              type="number"
              data-testid="attr1-input"
              id="firstAtribute"
              value={cardAttr1}
              onChange={onInputChange}
              name="cardAttr1"
            />

          </label>

          <label htmlFor="secondAtribute"className='labels-attr2'>
          Precisão🎯
            <input
              type="number"
              data-testid="attr2-input"
              id="secondAtribute"
              value={cardAttr2}
              onChange={onInputChange}
              name="cardAttr2"
            />

          </label>

          <label htmlFor="thirdAtribute" className='labels-attr'>
            Velocidade⚡
            <input
              type="number"
              data-testid="attr3-input"
              id="thirdAtribute"
              value={cardAttr3}
              onChange={onInputChange}
              name="cardAttr3"
            />

          </label>

          <label htmlFor="Input-cardImage" className='labels-attr'>
            Imagem
            <input
              type="text"
              id="Input-cardImage"
              data-testid="image-input"
              value={cardImage}
              onChange={onInputChange}
              name="cardImage"
            />

          </label>

        </section>
        <label htmlFor="Input-CardRarity">
          Raridade
          <select
            id="Input-CardRarity"
            data-testid="rare-input"
            value={cardRare}
            onChange={onInputChange}
            name="cardRare"
          >
            <option> </option>
            <option>Normal</option>
            <option>Raro</option>
            <option >Muito Raro</option>
          </select>

        </label>

        <label htmlFor="sTrunfo">
          Super Trunfo
          {/* referencia https://github.com/tryber/sd-015-b-project-tryunfo/pull/53/commits/28e2fcad843a02e4c70ef0c75e9ab87716a1a043 */}
          {
            hasTrunfo
              ? (
                <p>
                  Você já tem um Super Trunfo em seu Deck
                </p>
              )
              : (
                <input
                  type="checkbox"
                  id="sTrunfo"
                  data-testid="trunfo-input"
                  checked={cardTrunfo}
                  onChange={onInputChange}
                  name="cardTrunfo"
                />
              )
          }
        </label>
        <button
          type="button"
          data-testid="save-button"
          disabled={isSaveButtonDisabled}
          onClick={onSaveButtonClick}

        >
          Salvar
        </button>

      </form>
      </>
    );
  }
}
/* referencia: https://www.youtube.com/watch?v=e3hL0eMcFW4&t=104s */
Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  hasTrunfo: PropTypes.bool
}.isRequired;
