import React from 'react';
import styles from './DeviceItem.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, changeQuantity } from '../../store/reducers/shoppingCartSlice';

export default function DeviceItem({ item, title, link, price, id }) {
  const itemsInCart = useSelector((state) => state.shoppingCart.shoppingCartItems);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        navigate(`/device/${id}`);
      }}
      className={styles.card}>
      <img src={link} alt={title} className={styles.image} />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.price__wrapper}>
          <p className={styles.price}>{`${price} $`}</p>
          <button
            disabled={itemsInCart.some((item) => item.id === id)}
            onClick={(event) => {
              event.stopPropagation();
              dispatch(addToCart(item));
              dispatch(changeQuantity({ id, value: 1 }));
            }}
            className={styles.card__button}>
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}
