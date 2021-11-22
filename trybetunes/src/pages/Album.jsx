import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicsAlbum: [],
      FavoriteSongs: [],
    };
  }

  async componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    /* desestruturação peguei a ideia q o gabriel oliveira teve https://trybecourse.slack.com/archives/C02B4PPBERE/p1636685063492800 */
    const { props: { match: { params: { id } } } } = this;

    const response = await getMusics(id);
    this.setState({
      musicsAlbum: response,
    });
    const responseFavoriteSongs = await getFavoriteSongs();

    this.setState({
      FavoriteSongs: responseFavoriteSongs,

    });
  }

  render() {
    const { musicsAlbum, FavoriteSongs } = this.state;

    return (
      <main data-testid="page-album">
        <Header />
        {(musicsAlbum.length > 0)
          ? (
            
              <section id='album-full'   key={ musicsAlbum[0].collectionId }>
               <div id='album-info'>
                  <img src={musicsAlbum[0].artworkUrl100}/>
                  <h1 data-testid="album-name">{musicsAlbum[0].collectionName} </h1>
                  <span id='album-artist-name' data-testid="artist-name">{musicsAlbum[0].artistName}</span>
               </div>
               <div id='album-musics'>
                  {musicsAlbum.map(({ trackName, previewUrl, trackId }, index) => (
                    <MusicCard
                      key={ index }
                      trackName={ trackName }
                      previewUrl={ previewUrl }
                      trackId={ trackId }
                      FavoriteSongsState={ FavoriteSongs }
                    />
                  ))}
               </div>
              </section>
            
          )
          : null}
      </main>
    );
  }
}

Album.propTypes = {
  match: PropTypes.number,

}.isRequired;
