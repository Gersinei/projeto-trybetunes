import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    name: '',
    carregando: false,
  };

  componentDidMount() {
    this.callGetUser();
  }

  callGetUser = () => {
    this.setState(
      {
        carregando: true,
      },
      async () => {
        const contatoUser = await getUser();
        this.setState({
          name: contatoUser.name,
          carregando: false,
        });
      },
    );
  };

  render() {
    const { carregando, name } = this.state;
    return (
      <div
        data-testid="header-component"
      >
        <h1 data-testid="header-user-name">
          { name }
        </h1>
        {
          carregando && <Carregando />
        }
      </div>
    );
  }
}
