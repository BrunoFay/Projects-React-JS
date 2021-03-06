import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import Cards from './components/Cards';
import Filtred from './components/FilterInput';
import { BrowserRouter, Link, Route } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      deckCards: [],
      filterByName: '',
      filterByRarity: 'todas',

    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonDisabled = this.buttonDisabled.bind(this);
    this.saveCard = this.saveCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.checkTrunfo = this.checkTrunfo.bind(this);
    this.filterCardByName = this.filterCardByName.bind(this);
    this.filterCardByRarity = this.filterCardByRarity.bind(this);
    this.filterCardByTrunfo = this.filterCardByTrunfo.bind(this);

  }
  componentDidMount() {
    let cards = localStorage.getItem('deckCards');
    if (cards) {
      cards = JSON.parse(cards)
      this.setState({ deckCards: cards })
    }
  }

  // referencia: função usada nos exercicios feitos em aula
  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.buttonDisabled);
  }

  checkTrunfo() {
    const { deckCards } = this.state;

    return this.setState({
      cardTrunfo: deckCards.some((card) => card.cardTrunfo),
    });
  }

  // referencia: https://github.com/tryber/sd-015-b-project-tryunfo/pull/70/commits/0598a525aa1b8575b5b3cb790b9bb94ed4ba9ac2
  buttonDisabled() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare } = this.state;

    const maxValue = 300;
    const maxValueCard = 100;
    const minValueCard = 0;
    const checkMaxValueCard = (Number(cardAttr1) <= maxValueCard
      && Number(cardAttr2) <= maxValueCard
      && Number(cardAttr3) <= maxValueCard);
    const checkMinValueCard = (Number(cardAttr1) >= minValueCard
      && Number(cardAttr2) >= minValueCard
      && Number(cardAttr3) >= minValueCard);
    const sumCardValues = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const checkTotalValuesOfCards = (sumCardValues <= maxValue);
    const checkInputs = (
      cardName
      && cardDescription
      && cardImage
      && cardRare
    );
    const checkInputsAndCardValues = () => ((checkInputs && checkMaxValueCard
      && checkMinValueCard && checkTotalValuesOfCards)
      ? this.setState({
        isSaveButtonDisabled: false,
      }) : this.setState({
        isSaveButtonDisabled: true,
      }));
    return checkInputsAndCardValues();
  }

  // referencia : https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array COMO SALVAR VARIOS DADOS EM UM ARRAY SEM SOBRESCREVER
  saveCard() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      deckCards,
      id,
    } = this.state;

    const updatedDeck = [...deckCards, {
      id: id,
      name: cardName,
      description: cardDescription,
      cardValues: {
        attr1: cardAttr1,
        attr2: cardAttr2,
        attr3: cardAttr3,
      },
      image: cardImage,
      rarity: cardRare,
      trunfo: cardTrunfo,
    }]
    const ramdomId = () => Math.round(Math.random() * 9999)

    if (cardTrunfo) this.setState({ hasTrunfo: true });
    this.setState(() => ({
      deckCards: updatedDeck,
    }));
    localStorage.setItem('deckCards', JSON.stringify(updatedDeck));
    // https://www.youtube.com/watch?v=8SbOweou7Rw
    this.setState({
      id: ramdomId(),
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardRare: '',
      isSaveButtonDisabled: true
    }, this.checkTrunfo);

  }

  removeCard(cardName, cardTrunfo) {
    const { deckCards } = this.state;
    const updateCards = deckCards.filter(({ name }) => name !== cardName);
    if (cardTrunfo) {
      this.setState({
        hasTrunfo: false,
        deckCards: updateCards,
      });
    }
    this.setState({
      deckCards: updateCards,
    });

    localStorage.setItem('deckCards', JSON.stringify(updateCards));
  }

  filterCardByName({ target }) {

    this.setState({ filterByName: target.value });
  }

  filterCardByRarity({ target }) {
    this.setState({ filterByRarity: target.value });
  }

  filterCardByTrunfo({ target }) {
    this.setState({ trunfoFilter: target.checked });
  }



  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      deckCards,
      filterByName,
      filterByRarity,
      id,
      trunfoFilter,
    } = this.state;
    var Spinner = require('react-spinkit');

    
    return (
      <BrowserRouter>
        <header>
          <h1>Tryunfo</h1>

          <nav>
          
            <Link to='/' >Home</Link>
            <Link to='/deck' >Deck</Link>
          </nav>
          <em>By Bruno Fay</em>
        </header>

        <div className='mommy'>

          <Route exact path='/'

            render={
              (props) =>
                <main>
                  <Form
                    {...props}
                    cardName={cardName}
                    cardDescription={cardDescription}
                    cardAttr1={cardAttr1}
                    cardAttr2={cardAttr2}
                    cardAttr3={cardAttr3}
                    cardImage={cardImage}
                    cardRare={cardRare}
                    cardTrunfo={cardTrunfo}
                    hasTrunfo={hasTrunfo}
                    isSaveButtonDisabled={isSaveButtonDisabled}
                    onInputChange={this.handleChange}
                    onSaveButtonClick={this.saveCard}

                  />


                  <Card
                    {...props}
                    id={id}
                    cardName={cardName}
                    cardDescription={cardDescription}
                    cardAttr1={cardAttr1}
                    cardAttr2={cardAttr2}
                    cardAttr3={cardAttr3}
                    cardImage={cardImage}
                    cardRare={cardRare}
                    cardTrunfo={cardTrunfo}

                  />

                </main>
            } />

          <Route exact path='/deck'
            render={(props) =>
              <>
                <Filtred
                  {...props}
                  filterCardName={this.filterCardByName}
                  filterCardRarity={this.filterCardByRarity}
                  filterCardByTrunfo={this.filterCardByTrunfo}
                  trunfoFilter={trunfoFilter}

                />


                <section className='deck'>
                  <Cards
                    {...props}

                    removeCard={this.removeCard}
                    deckCards={deckCards}
                    filterByName={filterByName}
                    filterByRarity={filterByRarity}
                    trunfoFilter={trunfoFilter}
                  />
                </section>
              </>
            } />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
