import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import List from './components/list/List';
import Menu from './components/Menu';
import Chat from './components/chat/Chat';
import Items from './components/items/Items';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/logIn" />} />
      <Route path="/logIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/menu/list" element={<List />} />
      <Route path="/menu/chat" element={<Chat />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu/items" element={<Items />}/>
    </Routes>
  );
};

export default App;
