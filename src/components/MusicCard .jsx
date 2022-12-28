import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
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
      </div>

    );
  }
}

MusicCard.propTypes = {
  musicas: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
  }).isRequired,
};
