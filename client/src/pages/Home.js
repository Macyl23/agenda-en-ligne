import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBarHome from '../components/NavBarHome';

const Home = () => {
    return (
        <div className='home'>
            <NavBarHome />
            <h1 className='welcome'>Bienvenue sur votre agenda en ligne de Mr.X!</h1>
            <div className='image'>
                <img src="./icon.jpg" alt="agenda" />
            </div>
            <div className='logInSignUp'>
                <h3>Pour prendre rendez-vous: </h3>
                <ul>
                    <li><button> <NavLink exact to = "/Login"> Se connecter</NavLink></button></li>
                    <li className='lien'><NavLink exact to ="/register" > Creer un compte</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Home;