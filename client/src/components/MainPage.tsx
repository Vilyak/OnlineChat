import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Channels from './Channels';
import Chat from './Chat';


const MainPage = () => {

    const dispatch = useDispatch();

    return (
        <div className="container h-100 my-0 overflow-hidden rounded shadow" style={{maxWidth: '100%'}}>
            <div className="row h-100 bg-white flex-md-row">
                <Channels />
                <Chat />
            </div>
        </div>
    );
};

export default MainPage;