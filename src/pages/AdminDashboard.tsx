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
    <div className="min-h-screen bg-stone/5 flex">
      {/* Sidebar */}
      <div className="w-64 bg-cream border-r border-stone/10 p-6 flex flex-col">
        <h2 className="font-serif text-xl mb-8">CMS Admin</h2>
        <nav className="flex flex-col gap-2">
          <button 
            className={`text-left px-4 py-2 rounded-md ${activeTab === 'home' ? 'bg-terracotta text-white' : 'hover:bg-stone/10'}`}
            onClick={() => setActiveTab('home')}
          >
            Home Page
          </button>
          <button className="text-left px-4 py-2 text-stone/50" disabled>Services (Coming Soon)</button>
        </nav>
        <button 
          onClick={() => auth.signOut()}
          className="mt-auto text-left text-sm text-stone underline"
        >
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif">Edit Home Page</h1>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="px-6 py-2 bg-ink text-white rounded-md uppercase tracking-wider text-sm hover:bg-ink/80 transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        {message && <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">{message}</div>}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* English Editor */}
          <div className="bg-white p-6 rounded-md shadow-sm border border-stone/10 flex flex-col gap-4">
            <h3 className="font-bold border-b pb-2">English</h3>
            
            <label className="text-sm font-semibold">Hero Title</label>
            <input type="text" className="w-full p-2 border rounded" value={homeData.en.heroTitle} onChange={(e) => updateField('en', 'heroTitle', e.target.value)} />
            
            <label className="text-sm font-semibold">Hero Subtitle</label>
            <textarea className="w-full p-2 border rounded h-24" value={homeData.en.heroSubtitle} onChange={(e) => updateField('en', 'heroSubtitle', e.target.value)} />

            <label className="text-sm font-semibold">Approach Title</label>
            <input type="text" className="w-full p-2 border rounded" value={homeData.en.approachTitle} onChange={(e) => updateField('en', 'approachTitle', e.target.value)} />
            
            <label className="text-sm font-semibold">Approach Body</label>
            <textarea className="w-full p-2 border rounded h-24" value={homeData.en.approachBody} onChange={(e) => updateField('en', 'approachBody', e.target.value)} />
            
            <label className="text-sm font-semibold">Ready Title</label>
            <input type="text" className="w-full p-2 border rounded" value={homeData.en.readyTitle} onChange={(e) => updateField('en', 'readyTitle', e.target.value)} />
            
            <label className="text-sm font-semibold">Ready Body</label>
            <textarea className="w-full p-2 border rounded h-24" value={homeData.en.readyBody} onChange={(e) => updateField('en', 'readyBody', e.target.value)} />
          </div>

          {/* Spanish Editor */}
          <div className="bg-white p-6 rounded-md shadow-sm border border-stone/10 flex flex-col gap-4">
            <h3 className="font-bold border-b pb-2">Spanish</h3>
            
            <label className="text-sm font-semibold">Hero Title</label>
            <input type="text" className="w-full p-2 border rounded" value={homeData.es.heroTitle} onChange={(e) => updateField('es', 'heroTitle', e.target.value)} />
            
            <label className="text-sm font-semibold">Hero Subtitle</label>
            <textarea className="w-full p-2 border rounded h-24" value={homeData.es.heroSubtitle} onChange={(e) => updateField('es', 'heroSubtitle', e.target.value)} />

            <label className="text-sm font-semibold">Approach Title</label>
            <input type="text" className="w-full p-2 border rounded" value={homeData.es.approachTitle} onChange={(e) => updateField('es', 'approachTitle', e.target.value)} />
            
            <label className="text-sm font-semibold">Approach Body</label>
            <textarea className="w-full p-2 border rounded h-24" value={homeData.es.approachBody} onChange={(e) => updateField('es', 'approachBody', e.target.value)} />
            
            <label className="text-sm font-semibold">Ready Title</label>
            <input type="text" className="w-full p-2 border rounded" value={homeData.es.readyTitle} onChange={(e) => updateField('es', 'readyTitle', e.target.value)} />
            
            <label className="text-sm font-semibold">Ready Body</label>
            <textarea className="w-full p-2 border rounded h-24" value={homeData.es.readyBody} onChange={(e) => updateField('es', 'readyBody', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}
