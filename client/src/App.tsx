import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import { fetchRooms } from './actions';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Modal from './components/modals/Modal';
import { ChatState } from './types';

function App() {
  const dispatch = useDispatch();
  const {userData} = useSelector((store: ChatState) => store);

  useEffect(() => {
    dispatch(fetchRooms.request());
  },[dispatch, fetchRooms.request])

  return (
    <>
    <Modal/>
    {
      userData ? <MainPage /> : <LoginPage />
    }
    </>
  );
}

export default App;
