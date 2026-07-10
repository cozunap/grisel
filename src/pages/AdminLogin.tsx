import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError('Invalid credentials or unauthorized access.');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 shadow-sm rounded-md">
        <h1 className="text-2xl font-serif text-ink mb-6 text-center">Grisel Spa CMS</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-stone/20 rounded-md focus:outline-none focus:border-terracotta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-stone/20 rounded-md focus:outline-none focus:border-terracotta"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="w-full py-3 mt-4 bg-terracotta text-white font-semibold uppercase tracking-wider rounded-md hover:bg-terracotta-dark transition-colors">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
