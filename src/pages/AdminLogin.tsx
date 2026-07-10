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
    <div className="min-h-screen bg-[#f1f1f1] flex flex-col items-center justify-center p-6 font-sans">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-serif text-[#1d2327]">Grisel Spa</h1>
      </div>
      <div className="max-w-[320px] w-full bg-white p-6 shadow-sm border border-[#c3c4c7] rounded-sm">
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-[#1d2327] mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-[#8c8f94] rounded-[3px] focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] shadow-inner text-[#2c3338] bg-white appearance-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-[#1d2327] mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-[#8c8f94] rounded-[3px] focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] shadow-inner text-[#2c3338] bg-white appearance-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 bg-[#2271b1] text-white font-medium rounded-[3px] hover:bg-[#135e96] transition-colors shadow-sm text-[13px]">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
