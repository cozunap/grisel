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
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[400px]">
        {/* Decap Style Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1a202c]">Content Manager</h1>
        </div>

        {/* Decap Style Card */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] p-8">
          {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{error}</p>}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] focus:ring-1 focus:ring-[#05a3a4] transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] focus:ring-1 focus:ring-[#05a3a4] transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="mt-2 w-full bg-[#05a3a4] text-white py-2.5 rounded font-medium text-[15px] hover:bg-[#048889] transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
