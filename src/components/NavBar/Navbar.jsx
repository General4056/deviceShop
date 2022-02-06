import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import styles from './NavBar.module.css';
import { MenuContext } from '../../contexts/menuContext';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchByQuery } from '../../store/reducers/deviceSlice';

export default function NavBar() {
  const { setMenuIsOpened, loggedIn, setLoggedIn, userEmail } = useContext(MenuContext);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();

  const itemsInCart = useSelector((state) => state.shoppingCart.shoppingCartItems);

  let navigate = useNavigate();

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  function searchSubmit(e) {
    e.preventDefault();

    dispatch(fetchByQuery(searchQuery));
    navigate('/');
    setSearchQuery('');
  }

  function openMenu() {
    setMenuIsOpened(true);
  }

  function loggedOut() {
    setLoggedIn(false);
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <div className={styles.navigate}>
          <button className={styles.button} onClick={openMenu}>
            <span className={styles.button__line}></span>
          </button>
          <Link to="/" className={styles.logo}>
            КупиДевайс
          </Link>
          <div className={styles.search}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className={styles.search__input}
              placeholder="Поиск по сайту"
            />
            <button onClick={searchSubmit} className={styles.search__button} disabled={!searchQuery}></button>
          </div>
        </div>
        <Nav>
          <Link to="/shopingCart" className={styles.link}>
            <p className={styles.link__text}>Корзина</p>
            <span className={styles.link__badge}>{itemsInCart.length}</span>
          </Link>
          {loggedIn ? (
            <>
              <div className={styles.link}>{userEmail}</div>
              <a href="#" className={styles.link} onClick={loggedOut}>
                Выйти
              </a>
            </>
          ) : (
            <Link to="/signIn" className={styles.link}>
              Войти
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
