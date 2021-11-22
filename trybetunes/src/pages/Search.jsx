import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import ArtistSearch from '../components/ArtistSearch';

export default class Search extends Component {
  /* referencia: aula de reforço rapunzel
   como linkar uma propriedade obtida por logica para um link <link to={`/test/${chave do state}`}></link> */
  constructor() {
    super();
    this.state = {
      name: '',
      Button: true,
      loading: false,
      searchFail: false,
      searchResult: [],
    };
  }

  fetchResponse = async () => {
    const { name } = this.state;
    const response = await searchAlbumsAPI(name);
    return (response.length > 0)
      ? this.setState({
        searchResult: response,
        loading: false,
        searchFail: false,
      }) : this.setState({
        loading: false,
        searchResult: [],
        searchFail: true,
      });
  }

  buttonSearch = () => {
    this.setState({
      searchFail: true,
      loading: true,
    }, this.fetchResponse);
  }

  handleChange = ({ target }) => {
    this.setState({
      name: target.value,
    }, this.disableButton);
  }

  disableButton = () => {
    const { name } = this.state;
    const minNameForInput = 2;

    if (name.length >= minNameForInput) {
      return this.setState({
        Button: false,
      });
    }
    return this.setState({
      Button: true,
    });
  }

  render() {
    const { Button, searchResult, loading, name, searchFail } = this.state;

    return (
      <div id="page-search">
        <Header />
        {(loading) ? (
          <Carregando />
        ) : (
          <form id='form-search'>
            <input
            id='input-search'
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ Button }
              onClick={ this.buttonSearch }
            >
              Search
            </button>
          </form>
        )}
        {(searchFail && !loading) && (
          <span className='message-result'>Nenhum álbum foi encontrado</span>
        )}
        {(searchResult.length > 0)
          && (
            <div>
              <span className='message-result'>Resultado de álbuns de: {name}</span>
              <ArtistSearch searchResult={ searchResult } />
            </div>
          )}
      </div>
    );
  }
}
