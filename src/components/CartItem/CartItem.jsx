import React, { useState, useContext, useEffect } from 'react';
import styles from './CartItem.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { MenuContext } from '../../contexts/menuContext';
import { getItemById } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { changeQuantity, deleteFromCart } from '../../store/reducers/shoppingCartSlice';

export default function CartItem({ item, id }) {
  const dispatch = useDispatch();

  function changeCount(value) {
    dispatch(changeQuantity({ id, value: value }));
  }

  function deleteItemFromCart() {
    dispatch(deleteFromCart({ id }));
  }

  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.title} className={styles.image} />
      <Link to={`/device/${id}`} className={styles.title}>
        {item.title}
      </Link>
      <div className={styles.counter}>
        <button
          disabled={item.quantity === 0}
          className={styles.counter__minus}
          onClick={() => changeCount(-1)}></button>
        <div className={styles.counter__input}>{item.quantity}</div>
        <button className={styles.counter__plus} onClick={() => changeCount(1)}></button>
      </div>
      <p className={styles.price}>{`${item.price} $`}</p>
      <button className={styles.delete} onClick={() => deleteItemFromCart()}></button>
    </div>
  );
}
