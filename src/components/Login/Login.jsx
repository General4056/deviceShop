import React, { useContext } from 'react';
import styles from './Login.module.css';
import { MenuContext } from '../../contexts/menuContext';
import { useInput } from '../../utils/useInput';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setUserEmail, setLoggedIn } = useContext(MenuContext);

  const navigate = useNavigate();

  const emailInput = useInput('', {
    isEmail: true,
    isEmpty: true,
    minLength: 3,
    maxLength: 30
  });

  const passwordInput = useInput('', {
    isEmpty: true,
    minLength: 5,
    maxLength: 16
  });

  function handleLogin() {
    if (!emailInput.value || !passwordInput.value) return;
    setLoggedIn(true);
    setUserEmail(emailInput.value);
    navigate('/');
  }

  return (
    <div className={styles.login}>
      <form className={styles.form}>
        <h2 className={styles.form__title}>Вход</h2>
        <label className={styles.form__label}>
          <input
            type="email"
            value={emailInput.value}
            onChange={emailInput.onChange}
            onBlur={emailInput.onBlur}
            className={styles.form__input}
            placeholder="Введите email"
          />
          {emailInput.isDirty && !emailInput.inputValid && (
            <span className={styles.form__error}>{emailInput.errorMessage}</span>
          )}
        </label>
        <label className={styles.form__label}>
          <input
            type="password"
            value={passwordInput.value}
            onChange={passwordInput.onChange}
            onBlur={passwordInput.onBlur}
            className={styles.form__input}
            placeholder="Введите пароль"
          />
          {passwordInput.isDirty && !passwordInput.inputValid && (
            <span className={styles.form__error}>{passwordInput.errorMessage}</span>
          )}
        </label>
        <button
          onClick={handleLogin}
          className={styles.form__button}
          disabled={!passwordInput.inputValid || !emailInput.inputValid}>
          Войти
        </button>
      </form>
    </div>
  );
}
