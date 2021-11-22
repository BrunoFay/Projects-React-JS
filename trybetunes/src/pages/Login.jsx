import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';
/* tive que fazer as funçoes aqui dentro, pois nao estava conseguindo passar o state de app como props para Login
referencia: https://github.com/tryber/sd-016-b-project-trybetunes/pull/8/commits/2d19c947e40ab0ed09a8c89e51c70ee831a2042b
- implementar uma logica para quando apertar o enter apos colocar o nome do usuario e na barra de pesquisa, ser redirecionado

*/
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      Button: true,
      loading: false,
      redirect: false,
    };
  }

   handleClick = async () => {
     const { name } = this.state;
     this.setState({
       loading: true,
     });
     await createUser({ name });
     this.setState({
       loading: false,
       redirect: true,
     });
   }

  handleChange = ({ target }) => {
    this.setState({
      name: target.value,
    }, this.disableButton);
  }

  disableButton = () => {
    const { name } = this.state;
    const minNameForInput = 3;

    if (name.length >= minNameForInput) {
      return this.setState({
        Button: false,
      });
    }
    return this.setState({
      Button: true,
    });
  }

  render() {
    const {
      Button,
      redirect,
      loading,
    } = this.state;

    if (loading) return <Carregando />;
    if (redirect) return <Redirect to="/search" />;
    return (

      <div data-testid="page-login" id='login-container'>
        <form id='form-login'>
         <h1>TrybeTunes 🎧</h1>
            <input
              id="input-login"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ Button }
            onClick={ this.handleClick }
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}
