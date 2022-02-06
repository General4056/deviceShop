import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from '../../utils/api';
import styles from './DevicePage.module.css';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, changeQuantity } from '../../store/reducers/shoppingCartSlice';

export default function DevicePage() {
  const [product, setProduct] = useState({});
  const [productLoading, setProductLoading] = useState(false);

  const dispatch = useDispatch();

  const itemsInCart = useSelector((state) => state.shoppingCart.shoppingCartItems);

  let { id } = useParams();

  useEffect(() => {
    setProductLoading(true);
    getItemById(id)
      .then((item) => {
        setProduct(item);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setProductLoading(false);
      });
  }, []);

  function addItem(event) {
    event.stopPropagation();
    id = Number(id);
    dispatch(addToCart(product));
    dispatch(changeQuantity({ id, value: 1 }));
  }

  return productLoading ? (
    <div className={styles.loader__container}>
      <Loader></Loader>
    </div>
  ) : (
    <div className={styles.page}>
      <h2 className={styles.title}>{product.title}</h2>
      <div className={styles.page__container}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <div>
          <div className={styles.short_descr}>
            <p>Краткое описание:</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac porta sapien. Teget mollis elit.</p>
          </div>
          <div className={styles.buy__container}>
            <div className={styles.price__top_line}>
              <div className={styles.price}>{product.price} $</div>
              <button
                className={styles.button}
                onClick={addItem}
                disabled={itemsInCart.some((item) => item.id === Number(id))}>
                Купить
              </button>
            </div>
            <div className={styles.price__bot_line}>
              <div className={styles.oreder}>
                <p className={styles.oreder__text}>В наличии:</p>
                <p className={styles.oreder__text}>15 шт</p>
              </div>
              <div className={styles.oreder}>
                <p className={styles.oreder__text}>Пункты выдачи:</p>
                <p className={styles.oreder__text}>доступны</p>
              </div>
              <div className={styles.oreder}>
                <p className={styles.oreder__text}>Доставим на дом:</p>
                <p className={styles.oreder__text}>завтра</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.description}>{product.description}</div>
    </div>
  );
}
