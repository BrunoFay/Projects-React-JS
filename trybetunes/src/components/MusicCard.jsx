import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      CheckedInputState: false,

    };
  }

  componentDidMount() {
    this.setFavoriteSongsOnState();
  }

  setFavoriteSongsOnState = async () => {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });
    const FavoriteSongs = await getFavoriteSongs();
    const SetFavoritesChecksInput = FavoriteSongs
      .some((favorite) => favorite.trackId === trackId);
    this.setState({
      loading: false,
      CheckedInputState: SetFavoritesChecksInput,
      // FavoriteSongs,
    });
  }

  favoriteMusic = async (event) => {
    // referencia da 9 https://github.com/tryber/sd-016-b-project-trybetunes/pull/41 e https://codepen.io/tantata/pen/QGVMza
    const { setFavoriteSongs } = this.props;
    this.setState({
      loading: true,
    });

    if (event) {
      await addSong(this.props);
      this.setState({
        loading: false,
        CheckedInputState: true,
      });
    } else {
      await removeSong(this.props);
      this.setState({
        loading: false,
        CheckedInputState: false,
      });
    }
    if (setFavoriteSongs) {
      setFavoriteSongs();
    }
  }

  // referencia para refatorar https://github.com/tryber/sd-016-b-project-trybetunes/pull/13/commits/f145ad76d09f7ee920646129cf3c5b0992c58355
  render() {
    const { previewUrl, trackName, trackId,artworkUrl100 } = this.props;
    const { loading, CheckedInputState } = this.state;
    const pageWork = (loading)
      ? <Carregando />
      : (
        <div id='musics-container'>
          <span id='musics-names'>{trackName}</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite">
            ❤️
            <input
              type="checkbox"
              id="favorite"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ ({ target: { checked } }) => this.favoriteMusic(checked) }
              checked={ CheckedInputState }
            />
          </label>

        </div>
      );

    return ((previewUrl) ? pageWork : null);
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,

}.isRequired;
