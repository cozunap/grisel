import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [homeData, setHomeData] = useState<any>({
    en: { heroTitle: '', heroSubtitle: '', approachTitle: '', approachBody: '', readyTitle: '', readyBody: '', bookNow: '', exploreMenu: '' },
    es: { heroTitle: '', heroSubtitle: '', approachTitle: '', approachBody: '', readyTitle: '', readyBody: '', bookNow: '', exploreMenu: '' }
  });

  useEffect(() => {
    if (!loading && !user) navigate('/admin');
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const enSnap = await getDoc(doc(db, 'content', 'home-en'));
      const esSnap = await getDoc(doc(db, 'content', 'home-es'));
      setHomeData({
        en: enSnap.exists() ? enSnap.data() : homeData.en,
        es: esSnap.exists() ? esSnap.data() : homeData.es,
      });
    };
    if (user) fetchData();
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'content', 'home-en'), homeData.en);
      await setDoc(doc(db, 'content', 'home-es'), homeData.es);
      setMessage('Content saved successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Error saving content.');
    }
    setIsSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const updateField = (lang: 'en'|'es', field: string, value: string) => {
    setHomeData((prev: any) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value }
    }));
  };

  if (loading || !user) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f0f0f1] flex font-sans text-[#1d2327]">
      {/* WP-style Sidebar */}
      <div className="w-[160px] md:w-[240px] bg-[#1d2327] text-white flex flex-col fixed h-full z-10">
        <div className="p-4 bg-[#2c3338] flex items-center gap-2">
          <div className="w-6 h-6 bg-[#2271b1] rounded-full flex items-center justify-center text-white font-serif italic text-xs">G</div>
          <h2 className="font-semibold text-sm truncate">Grisel Spa</h2>
        </div>
        <nav className="flex flex-col mt-2 py-2">
          <button 
            className={`text-left px-4 py-2 text-[13px] ${activeTab === 'home' ? 'bg-[#2271b1] text-white font-semibold' : 'text-[#a7aaad] hover:text-white hover:bg-[#2c3338]'}`}
            onClick={() => setActiveTab('home')}
          >
            Dashboard (Home)
          </button>
          <button className="text-left px-4 py-2 text-[13px] text-[#a7aaad] opacity-50 cursor-not-allowed">Services</button>
          <button className="text-left px-4 py-2 text-[13px] text-[#a7aaad] opacity-50 cursor-not-allowed">Settings</button>
        </nav>
        <button 
          onClick={() => auth.signOut()}
          className="mt-auto mb-4 mx-4 text-left text-[13px] text-[#a7aaad] hover:text-white"
        >
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-[160px] md:ml-[240px] p-4 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[23px] font-normal text-[#1d2327]">Edit Home Page</h1>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="px-4 py-[6px] bg-[#2271b1] text-white rounded-[3px] border border-[#2271b1] text-[13px] hover:bg-[#135e96] transition-colors"
          >
            {isSaving ? 'Saving...' : 'Update'}
          </button>
        </div>
        {message && <div className="mb-6 p-3 bg-white border-l-4 border-[#00a32a] shadow-sm text-[13px] text-[#1d2327]">{message}</div>}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* English Editor */}
          <div className="bg-white border border-[#c3c4c7] flex flex-col">
            <div className="border-b border-[#c3c4c7] px-4 py-3 bg-[#f6f7f7]">
              <h3 className="font-semibold text-[14px]">English Content</h3>
            </div>
            <div className="p-4 flex flex-col gap-4 text-[13px]">
              <div>
                <label className="block font-semibold mb-1">Hero Title</label>
                <input type="text" className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.en.heroTitle} onChange={(e) => updateField('en', 'heroTitle', e.target.value)} />
              </div>
              
              <div>
                <label className="block font-semibold mb-1">Hero Subtitle</label>
                <textarea className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none h-24 focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.en.heroSubtitle} onChange={(e) => updateField('en', 'heroSubtitle', e.target.value)} />
              </div>

              <div>
                <label className="block font-semibold mb-1">Approach Title</label>
                <input type="text" className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.en.approachTitle} onChange={(e) => updateField('en', 'approachTitle', e.target.value)} />
              </div>
              
              <div>
                <label className="block font-semibold mb-1">Approach Body</label>
                <textarea className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none h-24 focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.en.approachBody} onChange={(e) => updateField('en', 'approachBody', e.target.value)} />
              </div>
              
              <div>
                <label className="block font-semibold mb-1">Ready Title</label>
                <input type="text" className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.en.readyTitle} onChange={(e) => updateField('en', 'readyTitle', e.target.value)} />
              </div>
              
              <div>
                <label className="block font-semibold mb-1">Ready Body</label>
                <textarea className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none h-24 focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.en.readyBody} onChange={(e) => updateField('en', 'readyBody', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Spanish Editor */}
          <div className="bg-white border border-[#c3c4c7] flex flex-col">
            <div className="border-b border-[#c3c4c7] px-4 py-3 bg-[#f6f7f7]">
              <h3 className="font-semibold text-[14px]">Spanish Content</h3>
            </div>
            <div className="p-4 flex flex-col gap-4 text-[13px]">
              <div>
                <label className="block font-semibold mb-1">Hero Title</label>
                <input type="text" className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.es.heroTitle} onChange={(e) => updateField('es', 'heroTitle', e.target.value)} />
              </div>
              
              <div>
                <label className="block font-semibold mb-1">Hero Subtitle</label>
                <textarea className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none h-24 focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.es.heroSubtitle} onChange={(e) => updateField('es', 'heroSubtitle', e.target.value)} />
              </div>

              <div>
                <label className="block font-semibold mb-1">Approach Title</label>
                <input type="text" className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.es.approachTitle} onChange={(e) => updateField('es', 'approachTitle', e.target.value)} />
              </div>
              
              <div>
                <label className="block font-semibold mb-1">Approach Body</label>
                <textarea className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none h-24 focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.es.approachBody} onChange={(e) => updateField('es', 'approachBody', e.target.value)} />
              </div>
              
              <div>
                <label className="block font-semibold mb-1">Ready Title</label>
                <input type="text" className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.es.readyTitle} onChange={(e) => updateField('es', 'readyTitle', e.target.value)} />
              </div>
              
              <div>
                <label className="block font-semibold mb-1">Ready Body</label>
                <textarea className="w-full px-3 py-1 border border-[#8c8f94] rounded-[3px] shadow-inner bg-white appearance-none h-24 focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]" value={homeData.es.readyBody} onChange={(e) => updateField('es', 'readyBody', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
