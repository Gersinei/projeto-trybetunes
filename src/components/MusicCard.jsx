import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  adicionarMusicas = async () => {
    const { musicas } = this.props;
    await addSong(musicas);
  };

  render() {
    const { musicas } = this.props;
    return (
      <div>
        <p>
          {' '}
          {musicas.trackName}
        </p>
        <audio data-testid="audio-component" src={ musicas.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ musicas.trackId }>
          <input
            data-testid={ `checkbox-music-${musicas.trackId}` }
            type="checkbox"
            id={ musicas.trackId }
            onChange={ this.adicionarMusicas }
          />
          Favorita
        </label>
      </div>

    );
  }
}
MusicCard.propTypes = {
  musicas: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
