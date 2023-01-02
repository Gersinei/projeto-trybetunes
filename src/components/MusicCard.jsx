import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    carregando: false,
    isChecked: false,
  };

  async componentDidMount() {
    this.setState({
      isChecked: await this.checkBox(),

    });
  }

  adicionarMusicas = async ({ target: { checked } }) => {
    const { musicas } = this.props;
    this.setState({
      carregando: true,
    });
    if (checked) {
      await addSong(musicas);
    } else {
      await removeSong(musicas);
    }
    this.setState({
      carregando: false,
      isChecked: checked,
    });
  };

  checkBox = async () => {
    const { musicas: { trackId } } = this.props;
    const pegarMusicasFavoritadas = await getFavoriteSongs();
    return pegarMusicasFavoritadas
      .map((favoritadas) => favoritadas.trackId).includes(trackId);
  };

  render() {
    const { musicas } = this.props;
    const { carregando, isChecked } = this.state;
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
            checked={ isChecked }

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
