import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    nomeArtista: '',
    nomeAlbum: '',
    data: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const retornoAPI = await getMusics(id);
    console.log(retornoAPI);
    this.setState({
      nomeArtista: retornoAPI[0].artistName,
      nomeAlbum: retornoAPI[0].collectionName,
      data: retornoAPI.slice(1),
    });
  }

  render() {
    const { nomeArtista, nomeAlbum, data } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{nomeArtista}</p>
        <p data-testid="album-name">{nomeAlbum}</p>
        {data
          .map((albumComMusicas) => (
            <MusicCard
              musicas={ albumComMusicas }
              key={ albumComMusicas.trackId }
            />
          ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
