import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { setSession } from '../store/authSlice';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    dispatch(setSession(data));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid place-items-center bg-saffron-50">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-3">
        <h1 className="text-2xl font-bold text-saffron-700">Login</h1>
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-saffron-700 text-white p-2 rounded">Sign In</button>
      </form>
    </div>
  );
};
