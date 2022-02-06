import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/Navbar';
import DeviceList from './components/DeviceList/DeviceList';
import BurgerMenu from './components/BurgerMenu/BurgerMenu';
import DevicePage from './components/DevicePage/DevicePage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Login from './components/Login/Login';
import { MenuContext } from './contexts/menuContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeviceListInCategory } from './store/reducers/deviceSlice';

function App() {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');
  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const selectedCategory = useSelector((state) => state.categories.selectedCategory);

  useEffect(() => {
    dispatch(fetchDeviceListInCategory(selectedCategory));
  }, [selectedCategory, dispatch]);

  return (
    <div>
      <MenuContext.Provider
        value={{
          menuIsOpened,
          setMenuIsOpened,
          loggedIn,
          setLoggedIn,
          userEmail,
          setUserEmail
        }}>
        <NavBar />
        <BurgerMenu />
        <Routes>
          <Route path="/*" element={<DeviceList />} />
          <Route path="/device/:id" element={<DevicePage />} />
          <Route path="/shopingCart" element={<ShoppingCart />} />
          <Route path="/signIn" element={<Login />} />
        </Routes>
      </MenuContext.Provider>
    </div>
  );
}

export default App;
