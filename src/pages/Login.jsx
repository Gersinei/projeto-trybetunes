import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { createUser } from '../services/userAPI';

import Carregando from './Carregando';

class Login extends Component {
  state = {
    name: '',
    carregando: false,
  };

  render() {
    const { name, carregando } = this.state;
    const { history } = this.props;
    const gg = 3;
    return (
      <div data-testid="page-login">
        <form action="">
          {
            carregando && <Carregando />
          }
          <input
            data-testid="login-name-input"
            type="text"
            onChange={ ({ target }) => this.setState({ name: target
              .value }) }
            onKeyDown={ async (event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                await createUser({ name });
                return history.push('/search');
              }
            } }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ name.length < gg }
            onClick={ async () => {
              this.setState({
                carregando: true,
              });
              await createUser({ name });
              return history.push('/search');
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
