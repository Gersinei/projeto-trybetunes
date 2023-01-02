import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    carregando: false,
  };

  adicionarMusicas = async () => {
    const { musicas } = this.props;
    this.setState({
      carregando: true,
    });
    await addSong(musicas);
    this.setState({
      carregando: false,
    });
  };

  render() {
    const { musicas } = this.props;
    const { carregando } = this.state;
    return (
      <div>
        { carregando && <Carregando /> }
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
