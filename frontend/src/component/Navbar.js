import '../styles/Navbar.scss';
import logo from '../assets/logo.png';

export const Navbar = () => {

    return (

        <nav className='navbar'>

            <div className='navbar_logo'>

                <img src={logo} alt='Rafale M Club logo'/>

            </div>

            <ul className='navbar_links'>

                <li><a href='#home'>Accueil</a></li>
                <li><a href='#about'>À propos</a></li>
                <li><a href='#pilots'>Nos pilotes</a></li>
                <li><a href='#pilots'>Nos avions</a></li>
                <li><a href='#events'>Événements</a></li>
                <li><a href='#contact'>Contact</a></li>

            </ul>

            <button className='navbar_cta'>Rejoindre</button>

        </nav>

    );

};