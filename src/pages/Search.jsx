import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    nameArtist: '',
  };

  render() {
    const { nameArtist } = this.state;
    const zeze = 2;
    return (
      <>
        <Header />
        <div data-testid="page-search" />
        <form>
          <input
            type="text"
            onChange={ ({ target }) => this.setState({ nameArtist: target.value }) }
            data-testid="search-artist-input"
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ nameArtist.length < zeze }
          >
            Pesquisar
          </button>
        </form>
      </>
    );
  }
}

export default Search;
