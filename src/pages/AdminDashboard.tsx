import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingService, setEditingService] = useState<any>(null);

  const [homeData, setHomeData] = useState<any>({
    en: { heroTitle: '', heroSubtitle: '', approachTitle: '', approachBody: '', readyTitle: '', readyBody: '', bookNow: '', exploreMenu: '' },
    es: { heroTitle: '', heroSubtitle: '', approachTitle: '', approachBody: '', readyTitle: '', readyBody: '', bookNow: '', exploreMenu: '' }
  });
  const [servicesData, setServicesData] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate('/admin');
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const enSnap = await getDoc(doc(db, 'content', 'home-en'));
      const esSnap = await getDoc(doc(db, 'content', 'home-es'));
      const servicesSnap = await getDocs(collection(db, 'services'));
      setHomeData({
        en: enSnap.exists() ? enSnap.data() : homeData.en,
        es: esSnap.exists() ? esSnap.data() : homeData.es,
      });
      setServicesData(servicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    if (user) fetchData();
  }, [user]);

  const handleSaveHome = async () => {
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

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let serviceId = editingService.id || editingService.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const serviceToSave = { ...editingService, id: serviceId };
      await setDoc(doc(db, 'services', serviceId), serviceToSave);
      setServicesData(prev => {
        const index = prev.findIndex(s => s.id === serviceId);
        if (index >= 0) { const newState = [...prev]; newState[index] = serviceToSave; return newState; }
        return [...prev, serviceToSave];
      });
      setEditingService(null);
      setMessage('Service saved successfully!');
    } catch (err) { console.error(err); setMessage('Error saving service.'); }
    setIsSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Delete this service?')) return;
    await deleteDoc(doc(db, 'services', id));
    setServicesData(prev => prev.filter(s => s.id !== id));
    setMessage('Service deleted.');
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
        </>
        )}

          {activeTab === 'services' && !editingService && (
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-[#1a202c]">Services</h1>
                <button 
                  onClick={() => setEditingService({ category: 'massage', name: '', shortDescription: '', premiumDescription: '', priceRange: '$$', duration: '60 min', image: '' })} 
                  className="px-5 py-2 bg-white text-[#05a3a4] rounded border border-[#05a3a4] font-medium text-[15px] hover:bg-[#e6fffa] transition-colors shadow-sm"
                >
                  New Service
                </button>
              </div>
              
              {message && <div className="mb-6 p-4 bg-[#e6fffa] border border-[#319795] text-[#285e61] rounded shadow-sm text-sm">{message}</div>}

              <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] overflow-hidden">
                <table className="w-full text-left border-collapse text-[15px]">
                  <thead>
                    <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Name</th>
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Category</th>
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Price</th>
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicesData.map(service => (
                      <tr key={service.id} className="border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors">
                        <td className="py-4 px-6 font-medium text-[#1a202c]">{service.name}</td>
                        <td className="py-4 px-6 text-[#4a5568] capitalize">{service.category}</td>
                        <td className="py-4 px-6 text-[#4a5568]">{service.priceRange}</td>
                        <td className="py-4 px-6 flex gap-4">
                          <button onClick={() => setEditingService(service)} className="text-[#05a3a4] hover:text-[#048889] font-medium">Edit</button>
                          <button onClick={() => handleDeleteService(service.id)} className="text-[#e53e3e] hover:text-[#c53030] font-medium">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {servicesData.length === 0 && (
                      <tr><td colSpan={4} className="py-8 px-6 text-center text-[#a0aec0]">No services found. Click "New Service" to create one.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'services' && editingService && (
            <form onSubmit={handleSaveService} className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-[#1a202c]">{editingService.id ? 'Edit Service' : 'New Service'}</h1>
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setEditingService(null)} 
                    className="px-5 py-2 bg-white text-[#4a5568] rounded border border-[#cbd5e0] font-medium text-[15px] hover:bg-[#f8fafc] transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="px-5 py-2 bg-[#05a3a4] text-white rounded font-medium text-[15px] hover:bg-[#048889] transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isSaving ? 'Publishing...' : 'Publish'}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] flex flex-col p-8 gap-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Service Name</label>
                    <input required type="text" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] transition-colors" value={editingService.name} onChange={(e) => setEditingService({...editingService, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] transition-colors" value={editingService.category} onChange={(e) => setEditingService({...editingService, category: e.target.value})}>
                      <option value="massage">Massage</option>
                      <option value="facials">Facials</option>
                      <option value="waxing">Waxing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Price Range</label>
                    <input required type="text" placeholder="e.g. $$ or $150" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] transition-colors" value={editingService.priceRange} onChange={(e) => setEditingService({...editingService, priceRange: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Duration</label>
                    <input required type="text" placeholder="e.g. 60 min" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] transition-colors" value={editingService.duration} onChange={(e) => setEditingService({...editingService, duration: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Image URL</label>
                  <input required type="url" placeholder="https://..." className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] transition-colors" value={editingService.image} onChange={(e) => setEditingService({...editingService, image: e.target.value})} />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Short Description</label>
                  <textarea required className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] transition-colors h-24" value={editingService.shortDescription} onChange={(e) => setEditingService({...editingService, shortDescription: e.target.value})} />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Premium Description (Full details)</label>
                  <p className="text-[#a0aec0] mb-3 text-[13px]">Separate paragraphs with a new line.</p>
                  <textarea required className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] transition-colors h-48" value={typeof editingService.premiumDescription === 'string' ? editingService.premiumDescription : editingService.premiumDescription?.join('\n\n')} onChange={(e) => setEditingService({...editingService, premiumDescription: e.target.value})} />
                </div>
              </div>
            </form>
          )}

        </main>
      </div>
    </div>
  );
}
