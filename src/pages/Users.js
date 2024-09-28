import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import UserDetails from '../components/UserDetails';

const Users = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="new" element={<UserForm />} />
      <Route path="edit/:id" element={<UserForm />} />
      <Route path=":id" element={<UserDetails />} />
    </Routes>
  );
};

export default Users;
