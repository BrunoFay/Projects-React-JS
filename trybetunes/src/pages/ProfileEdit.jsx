import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      allChecked: false,
      redirect: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.setUserProfile();
  }

  setUserProfile = async () => {
    this.setState({
      loading: true,
    });
    const response = await getUser();
    this.setState({
      loading: false,
      name: response.name,
      email: response.email,
      description: response.description,
      image: response.image,
    });
  }

  savedNewProfile = async () => {
    const {
      name,
      email,
      description,
      image } = this.state;

    const userProfile = {
      name,
      email,
      description,
      image,
    };

    this.setState({
      loading: true,
    });
    await updateUser(userProfile);
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    }, this.buttonDisabled);
  }

  // referencia https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  validateEmail = (email) => {
    const checkEmail = /\S+@\S+\.\S+/;
    return checkEmail.test(email);
  }

  buttonDisabled = () => {
    const {
      name,
      email,
      description,
      image } = this.state;

    const checkInputs = (
      name
      && this.validateEmail(email)
      && description
      && image
    );

    const checkInputsValues = () => ((checkInputs)
      ? this.setState({
        allChecked: false,
      }) : this.setState({
        allChecked: true,
      }));
    return checkInputsValues();
  }

  render() {
    const {
      loading,
      allChecked,
      name,
      email,
      description,
      image,
      redirect } = this.state;

    const fomEditProfile = (
      <form id='profile-form-edit'>
        <label htmlFor="input-name">

          Name
          <input
            id="input-name"
            type="text"
            data-testid="edit-input-name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="input-imagem">

          Image
          <input
            id="input-imagem"
            type="text"
            data-testid="edit-input-image"
            name="image"
            value={image}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="input-email">

          Email
          <input
            id="input-email"
            type="email"
            data-testid="edit-input-email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="input-descri">

          Description
          <textarea
            id="input-descri"
            data-testid="edit-input-description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </label>

        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={allChecked}
          onClick={this.savedNewProfile}
        >
          Save
        </button>
      </form>
    );
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Carregando /> : fomEditProfile}
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}
