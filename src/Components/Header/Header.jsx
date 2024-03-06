import React, { useContext } from 'react';
import './Header.css';
import {OlxLogo, Search, Arrow, SellButton, SellButtonPlus} from '../../assets'
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const {user} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  const navigate = useNavigate();

  const gotToLogin = () => {
    navigate('/login')
  }

  const signOut = () => {
    firebase.auth().signOut();
    navigate('/login')
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={user ? null : gotToLogin}>{user ? `Welcome, ${user.displayName}` : 'Login'}</span>
          <hr />
        </div>

          {user && <span onClick={signOut}>Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
