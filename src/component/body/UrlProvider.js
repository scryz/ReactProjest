import React from 'react';
import LoginPage from '../pages/LoginPage';
import AddEvent from '../pages/AddEvent';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import CRUDchat from '../pages/CRUDchat';
import Events from '../pages/Events';

const UrlProvider = ({ url }) => {
  return (
    <div>
      <LoginPage url={url} />
      <AddEvent url={url} />
      <Chat url={url} />
      <CRUDchat url={url} />
      <Events url={url} />
      <Profile url={url} />
    </div>
  );
};

export default UrlProvider;