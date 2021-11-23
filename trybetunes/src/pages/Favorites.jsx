import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      FavoriteSongs: [],
    };
  }

  componentDidMount() {
    this.setFavoriteSongs();
  }

  setFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const response = await getFavoriteSongs();
    this.setState({
      FavoriteSongs: response,
      loading: false,
    });
  }

  // usar o index como key para parar de dar erro na aplicação, foi vista na mentoria de projeto
  render() {
    const { loading, FavoriteSongs } = this.state;
    return (
      <div id="page-favorites">
        <Header />
        {
          loading ? <Carregando  />
            : (
              <section id='favorite-musics'>
                {FavoriteSongs
                .map(({ trackName, previewUrl, trackId}, index) => (
                  <MusicCard
                    key={ index }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    FavoriteSongsState={ FavoriteSongs }
                    setFavoriteSongs={ this.setFavoriteSongs }
                  />
                ))}

              </section>
            )
        }
      </div>
    );
  }
}
