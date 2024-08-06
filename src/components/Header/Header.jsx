import logo from '../../assets/logos/logo-white-32x32.png';
import './Header.css';

const Header = () => {
    return (
        <div className='navbar' >
            <div className='logo-container' >
                <h2>Movie Booking</h2>
                <img src={logo} alt='logo'/>
            </div>
            <div className='options' >

            </div>
        </div>
        
    )
}

export default Header;