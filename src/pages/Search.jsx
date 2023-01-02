import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends Component {
  state = {
    retornoDaApi: true,
    nameArtist: '',
    carregando: false,
    artistas: [],
  };

  pesquisar = async () => {
    this.setState({
      carregando: true,
    });
    const { nameArtist } = this.state;
    const data = await searchAlbumsAPI(nameArtist);
    if (data.length <= 0) {
      this.setState({
        retornoDaApi: false,
        carregando: false,
      });
    } else {
      this.setState({
        carregando: false,
        artistas: data,
        retornoDaApi: true,
      });
    }
  };

  render() {
    const { nameArtist, carregando, artistas, retornoDaApi } = this.state;
    const zeze = 2;
    return (

      <div data-testid="page-search">
        <Header />
        { carregando ? <Carregando />
          : (
            <div>
              <form>
                <input
                  type="text"
                  onChange={ ({ target }) => this.setState({ nameArtist: target.value }) }
                  data-testid="search-artist-input"
                  onKeyDown={ async (event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      this.pesquisar();
                    }
                  } }
                />

                <button
                  onClick={ this.pesquisar }
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ nameArtist.length < zeze }
                >
                  Pesquisar
                </button>
                <p>
                  Resultado de álbuns de:
                  {' '}
                  { nameArtist }
                  {' '}
                </p>
              </form>
              { !retornoDaApi && <p>Nenhum álbum foi encontrado</p> }
              {artistas.map((element, index) => (
                <div key={ index }>
                  <img src={ element.artworkUrl100 } alt="foto-album" />
                  <Link
                    data-testid={ `link-to-album-${element.collectionId}` }
                    to={ `/album/${element.collectionId}` }
                  >
                    {element.collectionName}
                  </Link>
                </div>
              ))}

            </div>
          )}
      </div>

    );
  }
}

export default Search;
