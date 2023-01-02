import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Favorites extends Component {
  state = {
    carregando: false,
    musicasFavoritas: [],
  };

  async componentDidMount() {
    const retornoFavoritas = await getFavoriteSongs();
    this.setState({
      musicasFavoritas: retornoFavoritas,
    });
  }

  // renderFavorits=
  render() {
    const { musicasFavoritas, carregando } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { carregando && <Carregando /> }
        {
          musicasFavoritas.map((musicas) => (
            <MusicCard musicas={ musicas } key={ musicas.trackId } />
          ))
        }
      </div>
    );
  }
}

export default Favorites;
