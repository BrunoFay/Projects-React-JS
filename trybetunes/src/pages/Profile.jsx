import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userProfile: {},
    };
  }

  componentDidMount() {
    this.setUser();
  }

   setUser = async () => {
     this.setState({
       loading: true,
     });
     const response = await getUser();
     this.setState({
       loading: false,
       userProfile: response,

     });
   }

   render() {
     const { loading, userProfile } = this.state;
     const { name, image, email, description } = userProfile;
     const userProfileConteiner = (
       <section id='profile'>
         <Link id='link-edit-perfil' to="/profile/edit">Edit Profile</Link>
         <h1 className='shadow-infos'>{name}</h1>
         <img
         id='image-perfil'
           src={ image }
           data-testid="profile-image"
           alt={ `imagem de ${name}` }
         />
         <span className='shadow-infos profile-email'>{email}</span>
         <textarea id='textArea'>
           {description}

         </textarea>
        
       </section>);
     return (
       <div id="page-profile" >
         <Header />
         {loading ? <Carregando /> : userProfileConteiner}
       </div>
     );
   }
}
