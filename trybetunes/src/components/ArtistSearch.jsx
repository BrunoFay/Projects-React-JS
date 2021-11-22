import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ArtistSearch extends Component {
  render() {
    const { searchResult } = this.props;
    return (
      <div id='album'>
        {searchResult
          .map(({ collectionName, collectionId,artworkUrl100,artistName }) => (
            <div key={ collectionId } id='album-card'>
              <img src={artworkUrl100} id='image-card'/>
             <span id='album-name'> {collectionName}</span>
             <span id='artist-name'>{artistName}</span>
              <Link
              id='album-link'
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                 Album
              </Link>
            </div>))}
      </div>
    );
  }
}
ArtistSearch.propTypes = {
  searchResult: PropTypes.array,

}.isRequired;
