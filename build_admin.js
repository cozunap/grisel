const fs = require('fs');
const path = require('path');

const code = `import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, getDocs, collection, deleteDoc, writeBatch } from 'firebase/firestore';
import shopData from '../../shop_data.json';

export default function AdminDashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [editingService, setEditingService] = useState<any>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [homeData, setHomeData] = useState<any>({
    en: { heroTitle: '', heroSubtitle: '', approachTitle: '', approachBody: '', readyTitle: '', readyBody: '', bookNow: '', exploreMenu: '' },
    es: { heroTitle: '', heroSubtitle: '', approachTitle: '', approachBody: '', readyTitle: '', readyBody: '', bookNow: '', exploreMenu: '' }
  });
  
  const [aboutData, setAboutData] = useState<any>({ heroTitle: '', heroSubtitle: '', philosophyText: '', philosophyImage: '', offeringsTitle: '', offeringsSubtitle: '', offer1Title: '', offer1Desc: '', offer2Title: '', offer2Desc: '', offer3Title: '', offer3Desc: '', ctaTitle: '', ctaSubtitle: '' });
  const [membershipData, setMembershipData] = useState<any>({ heroTitle: '', heroSubtitle: '', plan1Title: '', plan1Price: '', plan1Perks: '', plan2Title: '', plan2Price: '', plan2Perks: '', plan3Title: '', plan3Price: '', plan3Perks: '', footerNote: '', ctaTitle: '', ctaSubtitle: '' });
  const [giftCardsData, setGiftCardsData] = useState<any>({ heroTitle: '', heroSubtitle: '', use1Title: '', use1Desc: '', use2Title: '', use2Desc: '', use3Title: '', use3Desc: '', ctaTitle: '', ctaSubtitle: '', ctaPhone: '', ctaPhoneLink: '' });
  const [contactData, setContactData] = useState<any>({ heroTitle: '', heroSubtitle: '', address: '', phone: '', phoneLink: '', hours: '', mapUrl: '' });
  
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate('/admin');
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const enSnap = await getDoc(doc(db, 'content', 'home-en'));
      const esSnap = await getDoc(doc(db, 'content', 'home-es'));
      const aboutSnap = await getDoc(doc(db, 'content', 'about'));
      const membershipSnap = await getDoc(doc(db, 'content', 'membership'));
      const giftCardsSnap = await getDoc(doc(db, 'content', 'giftcards'));
      const contactSnap = await getDoc(doc(db, 'content', 'contact'));
      
      const servicesSnap = await getDocs(collection(db, 'services'));
      const productsSnap = await getDocs(collection(db, 'products'));
      
      if (enSnap.exists()) setHomeData(prev => ({ ...prev, en: enSnap.data() }));
      if (esSnap.exists()) setHomeData(prev => ({ ...prev, es: esSnap.data() }));
      if (aboutSnap.exists()) setAboutData(aboutSnap.data());
      if (membershipSnap.exists()) setMembershipData(membershipSnap.data());
      if (giftCardsSnap.exists()) setGiftCardsData(giftCardsSnap.data());
      if (contactSnap.exists()) setContactData(contactSnap.data());

      setServicesData(servicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      let pData = productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      pData.sort((a, b) => (a.priority || 0) - (b.priority || 0));
      setProductsData(pData);
    };
    if (user) fetchData();
  }, [user]);

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSaveDoc = async (collectionName: string, docId: string, data: any) => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, collectionName, docId), data);
      showMsg('Saved successfully!');
    } catch (err) {
      console.error(err);
      showMsg('Error saving.');
    }
    setIsSaving(false);
  };

  const handleSaveHome = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'content', 'home-en'), homeData.en);
      await setDoc(doc(db, 'content', 'home-es'), homeData.es);
      showMsg('Home saved successfully!');
    } catch (err) { console.error(err); showMsg('Error saving home.'); }
    setIsSaving(false);
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
      showMsg('Service saved successfully!');
    } catch (err) { console.error(err); showMsg('Error saving service.'); }
    setIsSaving(false);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let productId = editingProduct.id || editingProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const productToSave = { ...editingProduct, id: productId, priority: Number(editingProduct.priority) };
      await setDoc(doc(db, 'products', productId), productToSave);
      setProductsData(prev => {
        const index = prev.findIndex(s => s.id === productId);
        let newState;
        if (index >= 0) { newState = [...prev]; newState[index] = productToSave; }
        else { newState = [...prev, productToSave]; }
        newState.sort((a, b) => (a.priority || 0) - (b.priority || 0));
        return newState;
      });
      setEditingProduct(null);
      showMsg('Product saved successfully!');
    } catch (err) { console.error(err); showMsg('Error saving product.'); }
    setIsSaving(false);
  };

  const handleDeleteDoc = async (col: string, id: string, setLocalState: any) => {
    if (!window.confirm('Delete this item?')) return;
    await deleteDoc(doc(db, col, id));
    setLocalState((prev: any[]) => prev.filter(s => s.id !== id));
    showMsg('Item deleted.');
  };

  const seedDatabase = async () => {
    setIsSaving(true);
    try {
      const batch = writeBatch(db);
      
      batch.set(doc(db, "content", "about"), {
        heroTitle: "Revitalise your senses and refresh your mind!",
        heroSubtitle: "GRISEL BEAUTY SPA is the ideal solution for those looking to relax and find balance of health in all physical, psychological, mental, and spiritual levels.",
        philosophyText: "We provide noninvasive novel treatments with the latest trends in spa and alternative therapies to restore and maintain health. We combine science and techniques of alternative therapies for health care, utilizing high-tech appliances and products of aesthetic beauty to achieve the best benefits for your facial and body needs.\\n\\nWe are the best choice in price, quality, and professionalism. Grisel Beauty Spa helps you maintain the fundamental balance of your life through treatments and therapies designed for the care, balance, and restoration of your body, helping to achieve the rest of mind and body.",
        philosophyImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        offeringsTitle: "Our Core Offerings",
        offeringsSubtitle: "Find Your True Self",
        offer1Title: "Aromatherapy",
        offer1Desc: "A therapeutic discipline that exploits the properties of essential oils extracted from aromatic plants to restore balance and harmony of body and mind. It helps eliminate toxic effects and awakens our own healing energies.",
        offer2Title: "Meditation",
        offer2Desc: "Practiced for thousands of years, meditation is a tool for rediscovering the body’s own inner intelligence. It increases energy levels and lowers anxiety, helping you disconnect from the frantic activity of daily life.",
        offer3Title: "Body & Facial Treatments",
        offer3Desc: "We help you identify what your body and mind need. Find options to stimulate harmony with tailored relaxation programs. We have therapeutic and cosmetic packages for every occasion and need.",
        ctaTitle: "Come experience it for yourself",
        ctaSubtitle: "Do not hesitate to contact us to find options to stimulate the harmony of your body and mind."
      });

      batch.set(doc(db, "content", "membership"), {
        heroTitle: "Make wellness a habit, not a splurge",
        heroSubtitle: "Monthly membership means built-in service credits, member pricing, and priority booking, so your next facial, massage, or wax is already taken care of.",
        plan1Title: "Essentials",
        plan1Price: "$89",
        plan1Perks: "1 signature service credit each month (any facial, massage, or Brazilian wax)\\n10% off additional services booked same visit\\nUnused credits roll over up to 1 month\\nMember pricing on gift cards",
        plan2Title: "Renewal",
        plan2Price: "$149",
        plan2Perks: "2 service credits each month, mix and match any treatment\\n15% off additional services and retail add-ons\\nPriority access to Saturday booking windows\\nUnused credits roll over up to 2 months",
        plan3Title: "Unlimited Wellness",
        plan3Price: "$259",
        plan3Perks: "Unlimited waxing services\\n2 facial or massage credits each month\\n20% off everything else in the treatment menu\\nOne guest pass per quarter",
        footerNote: "Membership pricing and perks above are default starter tiers for planning purposes. Confirm final pricing, credit rules, and cancellation terms with Grisel before this goes live.",
        ctaTitle: "Ready to become a member?",
        ctaSubtitle: "Call, message, or book your first session and we'll get you set up on the plan that fits."
      });

      batch.set(doc(db, "content", "giftcards"), {
        heroTitle: "Give the gift of a moment of wellness",
        heroSubtitle: "A Grisel Beauty Spa gift card lets someone you care about choose their own escape, a facial, a massage, or a full afternoon of treatments.",
        use1Title: "Birthdays",
        use1Desc: "Skip the candles and give a day of rest instead. Pairs well with a hot stone massage or luxury facial.",
        use2Title: "Holidays",
        use2Desc: "An easy, meaningful gift for family, friends, or coworkers who could use a break from the season.",
        use3Title: "Just Because",
        use3Desc: "A thank-you gift for a new mom, a retiring colleague, or anyone due for a little care.",
        ctaTitle: "Gift cards are available by phone or in person",
        ctaSubtitle: "Online gift card purchases are coming soon. For now, call or email us and we'll set up any amount, mail or email the card, and even suggest a treatment to match the occasion.",
        ctaPhone: "(240) 701-0731",
        ctaPhoneLink: "tel:2407010731"
      });

      batch.set(doc(db, "content", "contact"), {
        heroTitle: "Contact Us",
        heroSubtitle: "Questions about a treatment, a gift card, or your appointment? Send a message or call us directly.",
        address: "1620 Elton Rd, Suite 205\\nSilver Spring, MD 20903",
        phone: "(240) 701-0731",
        phoneLink: "tel:2407010731",
        hours: "Saturday: 10:00 am - 7:00 pm\\nMon - Fri: By appointment",
        mapUrl: "https://www.google.com/maps?q=1620+Elton+Rd+Suite+205+Silver+Spring+MD+20903&output=embed"
      });

      // Shop data
      for (let i = 0; i < shopData.length; i++) {
        const p = shopData[i];
        const id = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        batch.set(doc(db, "products", id), {
          title: p.title,
          price: p.price,
          image: p.image || "",
          priority: i + 1
        });
      }

      await batch.commit();
      window.location.reload();
    } catch (e) {
      console.error(e);
      showMsg("Error seeding data.");
    }
    setIsSaving(false);
  };

  const updateField = (stateSetter: any, field: string, value: string) => {
    stateSetter((prev: any) => ({ ...prev, [field]: value }));
  };

  const renderInput = (label: string, stateSetter: any, data: any, field: string, isTextarea = false) => (
    <div>
      <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">{label}</label>
      {isTextarea ? (
        <textarea className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] transition-colors h-32" value={data[field] || ''} onChange={(e) => updateField(stateSetter, field, e.target.value)} />
      ) : (
        <input type="text" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] transition-colors" value={data[field] || ''} onChange={(e) => updateField(stateSetter, field, e.target.value)} />
      )}
    </div>
  );

  if (loading || !user) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans text-[#1a202c]">
      <header className="h-[56px] bg-white border-b border-[#e2e8f0] flex items-center justify-between px-6 shrink-0 shadow-sm z-10 relative">
        <div className="flex items-center gap-2 text-[#05a3a4] font-bold text-lg">
          Content Manager
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#718096]">{user?.email}</span>
          <button onClick={() => auth.signOut()} className="text-sm text-[#718096] hover:text-[#1a202c] transition-colors">Log Out</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[240px] bg-[#f8fafc] border-r border-[#e2e8f0] flex flex-col py-6 shrink-0 overflow-y-auto">
          <h2 className="px-6 text-[11px] font-bold text-[#a0aec0] uppercase tracking-wider mb-4">Collections</h2>
          <nav className="flex flex-col">
            {['home', 'services', 'catalogue', 'about', 'membership', 'giftcards', 'contact'].map(tab => (
              <button 
                key={tab}
                className={\`text-left px-6 py-2.5 text-[15px] transition-colors border-l-4 \${activeTab === tab ? 'border-[#05a3a4] bg-white text-[#1a202c] font-medium shadow-sm' : 'border-transparent text-[#4a5568] hover:bg-[#edf2f7]'}\`}
                onClick={() => { setActiveTab(tab); setEditingService(null); setEditingProduct(null); }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          <div className="mt-auto px-6 pt-6 border-t border-[#e2e8f0]">
            <button onClick={seedDatabase} disabled={isSaving} className="w-full px-3 py-2 bg-[#edf2f7] text-[#4a5568] rounded border border-[#cbd5e0] text-xs font-bold hover:bg-[#e2e8f0]">
              RUN SEED SCRIPT
            </button>
            <p className="text-[10px] text-[#a0aec0] mt-2 leading-tight">Use only once to populate DB with default content.</p>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          {message && <div className="mb-6 p-4 bg-[#e6fffa] border border-[#319795] text-[#285e61] rounded shadow-sm text-sm max-w-5xl mx-auto">{message}</div>}

          {/* HOME */}
          {activeTab === 'home' && (
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-[#1a202c]">Edit Home Page</h1>
                <button onClick={handleSaveHome} disabled={isSaving} className="px-5 py-2 bg-[#05a3a4] text-white rounded font-medium text-[15px] hover:bg-[#048889] shadow-sm disabled:opacity-50">Publish</button>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* EN */}
                <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] overflow-hidden flex flex-col">
                  <div className="border-b border-[#e2e8f0] px-6 py-4 bg-[#f8fafc]"><h2 className="font-semibold text-[#4a5568]">English Content</h2></div>
                  <div className="p-6 flex flex-col gap-6">
                    {renderInput('Hero Title', (fn: any) => setHomeData(prev => ({...prev, en: fn(prev.en)})), homeData.en, 'heroTitle')}
                    {renderInput('Hero Subtitle', (fn: any) => setHomeData(prev => ({...prev, en: fn(prev.en)})), homeData.en, 'heroSubtitle')}
                    {renderInput('Approach Title', (fn: any) => setHomeData(prev => ({...prev, en: fn(prev.en)})), homeData.en, 'approachTitle')}
                    {renderInput('Approach Body', (fn: any) => setHomeData(prev => ({...prev, en: fn(prev.en)})), homeData.en, 'approachBody', true)}
                    {renderInput('Ready Title', (fn: any) => setHomeData(prev => ({...prev, en: fn(prev.en)})), homeData.en, 'readyTitle')}
                  </div>
                </div>
                {/* ES */}
                <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] overflow-hidden flex flex-col">
                  <div className="border-b border-[#e2e8f0] px-6 py-4 bg-[#f8fafc]"><h2 className="font-semibold text-[#4a5568]">Spanish Content</h2></div>
                  <div className="p-6 flex flex-col gap-6">
                    {renderInput('Hero Title', (fn: any) => setHomeData(prev => ({...prev, es: fn(prev.es)})), homeData.es, 'heroTitle')}
                    {renderInput('Hero Subtitle', (fn: any) => setHomeData(prev => ({...prev, es: fn(prev.es)})), homeData.es, 'heroSubtitle')}
                    {renderInput('Approach Title', (fn: any) => setHomeData(prev => ({...prev, es: fn(prev.es)})), homeData.es, 'approachTitle')}
                    {renderInput('Approach Body', (fn: any) => setHomeData(prev => ({...prev, es: fn(prev.es)})), homeData.es, 'approachBody', true)}
                    {renderInput('Ready Title', (fn: any) => setHomeData(prev => ({...prev, es: fn(prev.es)})), homeData.es, 'readyTitle')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT */}
          {activeTab === 'about' && (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-[#1a202c]">Edit About Page</h1>
                <button onClick={() => handleSaveDoc('content', 'about', aboutData)} disabled={isSaving} className="px-5 py-2 bg-[#05a3a4] text-white rounded font-medium text-[15px] hover:bg-[#048889] shadow-sm disabled:opacity-50">Publish</button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] flex flex-col p-8 gap-6">
                {renderInput('Hero Title', setAboutData, aboutData, 'heroTitle')}
                {renderInput('Hero Subtitle', setAboutData, aboutData, 'heroSubtitle', true)}
                {renderInput('Philosophy Text', setAboutData, aboutData, 'philosophyText', true)}
                {renderInput('Philosophy Image URL', setAboutData, aboutData, 'philosophyImage')}
                <hr className="my-4 border-[#e2e8f0]" />
                <h3 className="font-bold text-[#1a202c]">Offerings Section</h3>
                {renderInput('Section Subtitle', setAboutData, aboutData, 'offeringsSubtitle')}
                {renderInput('Section Title', setAboutData, aboutData, 'offeringsTitle')}
                <div className="grid grid-cols-2 gap-4">
                  {renderInput('Offering 1 Title', setAboutData, aboutData, 'offer1Title')}
                  {renderInput('Offering 1 Description', setAboutData, aboutData, 'offer1Desc', true)}
                  {renderInput('Offering 2 Title', setAboutData, aboutData, 'offer2Title')}
                  {renderInput('Offering 2 Description', setAboutData, aboutData, 'offer2Desc', true)}
                  {renderInput('Offering 3 Title', setAboutData, aboutData, 'offer3Title')}
                  {renderInput('Offering 3 Description', setAboutData, aboutData, 'offer3Desc', true)}
                </div>
                <hr className="my-4 border-[#e2e8f0]" />
                {renderInput('CTA Title', setAboutData, aboutData, 'ctaTitle')}
                {renderInput('CTA Subtitle', setAboutData, aboutData, 'ctaSubtitle')}
              </div>
            </div>
          )}

          {/* MEMBERSHIP */}
          {activeTab === 'membership' && (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-[#1a202c]">Edit Membership Page</h1>
                <button onClick={() => handleSaveDoc('content', 'membership', membershipData)} disabled={isSaving} className="px-5 py-2 bg-[#05a3a4] text-white rounded font-medium text-[15px] hover:bg-[#048889] shadow-sm disabled:opacity-50">Publish</button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] flex flex-col p-8 gap-6">
                {renderInput('Hero Title', setMembershipData, membershipData, 'heroTitle')}
                {renderInput('Hero Subtitle', setMembershipData, membershipData, 'heroSubtitle', true)}
                <hr className="my-4 border-[#e2e8f0]" />
                <div className="grid grid-cols-2 gap-4">
                  {renderInput('Plan 1 Title', setMembershipData, membershipData, 'plan1Title')}
                  {renderInput('Plan 1 Price', setMembershipData, membershipData, 'plan1Price')}
                  <div className="col-span-2">{renderInput('Plan 1 Perks (newline separated)', setMembershipData, membershipData, 'plan1Perks', true)}</div>
                  
                  {renderInput('Plan 2 Title', setMembershipData, membershipData, 'plan2Title')}
                  {renderInput('Plan 2 Price', setMembershipData, membershipData, 'plan2Price')}
                  <div className="col-span-2">{renderInput('Plan 2 Perks (newline separated)', setMembershipData, membershipData, 'plan2Perks', true)}</div>
                  
                  {renderInput('Plan 3 Title', setMembershipData, membershipData, 'plan3Title')}
                  {renderInput('Plan 3 Price', setMembershipData, membershipData, 'plan3Price')}
                  <div className="col-span-2">{renderInput('Plan 3 Perks (newline separated)', setMembershipData, membershipData, 'plan3Perks', true)}</div>
                </div>
                <hr className="my-4 border-[#e2e8f0]" />
                {renderInput('Footer Disclaimer', setMembershipData, membershipData, 'footerNote', true)}
                {renderInput('CTA Title', setMembershipData, membershipData, 'ctaTitle')}
                {renderInput('CTA Subtitle', setMembershipData, membershipData, 'ctaSubtitle')}
              </div>
            </div>
          )}

          {/* GIFT CARDS */}
          {activeTab === 'giftcards' && (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-[#1a202c]">Edit Gift Cards Page</h1>
                <button onClick={() => handleSaveDoc('content', 'giftcards', giftCardsData)} disabled={isSaving} className="px-5 py-2 bg-[#05a3a4] text-white rounded font-medium text-[15px] hover:bg-[#048889] shadow-sm disabled:opacity-50">Publish</button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] flex flex-col p-8 gap-6">
                {renderInput('Hero Title', setGiftCardsData, giftCardsData, 'heroTitle')}
                {renderInput('Hero Subtitle', setGiftCardsData, giftCardsData, 'heroSubtitle', true)}
                <hr className="my-4 border-[#e2e8f0]" />
                <div className="grid grid-cols-2 gap-4">
                  {renderInput('Use Case 1 Title', setGiftCardsData, giftCardsData, 'use1Title')}
                  {renderInput('Use Case 1 Desc', setGiftCardsData, giftCardsData, 'use1Desc', true)}
                  {renderInput('Use Case 2 Title', setGiftCardsData, giftCardsData, 'use2Title')}
                  {renderInput('Use Case 2 Desc', setGiftCardsData, giftCardsData, 'use2Desc', true)}
                  {renderInput('Use Case 3 Title', setGiftCardsData, giftCardsData, 'use3Title')}
                  {renderInput('Use Case 3 Desc', setGiftCardsData, giftCardsData, 'use3Desc', true)}
                </div>
                <hr className="my-4 border-[#e2e8f0]" />
                {renderInput('CTA Title', setGiftCardsData, giftCardsData, 'ctaTitle')}
                {renderInput('CTA Subtitle', setGiftCardsData, giftCardsData, 'ctaSubtitle', true)}
                {renderInput('CTA Phone Display', setGiftCardsData, giftCardsData, 'ctaPhone')}
                {renderInput('CTA Phone Link', setGiftCardsData, giftCardsData, 'ctaPhoneLink')}
              </div>
            </div>
          )}

          {/* CONTACT */}
          {activeTab === 'contact' && (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-[#1a202c]">Edit Contact Page</h1>
                <button onClick={() => handleSaveDoc('content', 'contact', contactData)} disabled={isSaving} className="px-5 py-2 bg-[#05a3a4] text-white rounded font-medium text-[15px] hover:bg-[#048889] shadow-sm disabled:opacity-50">Publish</button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] flex flex-col p-8 gap-6">
                {renderInput('Hero Title', setContactData, contactData, 'heroTitle')}
                {renderInput('Hero Subtitle', setContactData, contactData, 'heroSubtitle', true)}
                <hr className="my-4 border-[#e2e8f0]" />
                {renderInput('Address (newline separated)', setContactData, contactData, 'address', true)}
                {renderInput('Phone Display', setContactData, contactData, 'phone')}
                {renderInput('Phone Link', setContactData, contactData, 'phoneLink')}
                {renderInput('Hours (newline separated)', setContactData, contactData, 'hours', true)}
                {renderInput('Google Maps Embed URL', setContactData, contactData, 'mapUrl')}
              </div>
            </div>
          )}

          {/* SERVICES LIST */}
          {activeTab === 'services' && !editingService && (
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-[#1a202c]">Services</h1>
                <button onClick={() => setEditingService({ category: 'massage', name: '', shortDescription: '', premiumDescription: '', priceRange: '$$', duration: '60 min', image: '' })} className="px-5 py-2 bg-white text-[#05a3a4] rounded border border-[#05a3a4] font-medium text-[15px] hover:bg-[#e6fffa] shadow-sm">New Service</button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] overflow-hidden">
                <table className="w-full text-left border-collapse text-[15px]">
                  <thead>
                    <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Name</th>
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Category</th>
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicesData.map(service => (
                      <tr key={service.id} className="border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors">
                        <td className="py-4 px-6 font-medium text-[#1a202c]">{service.name}</td>
                        <td className="py-4 px-6 text-[#4a5568] capitalize">{service.category}</td>
                        <td className="py-4 px-6 flex gap-4">
                          <button onClick={() => setEditingService(service)} className="text-[#05a3a4] hover:text-[#048889] font-medium">Edit</button>
                          <button onClick={() => handleDeleteDoc('services', service.id, setServicesData)} className="text-[#e53e3e] hover:text-[#c53030] font-medium">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {servicesData.length === 0 && (<tr><td colSpan={3} className="py-8 px-6 text-center text-[#a0aec0]">No services found.</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SERVICES FORM */}
          {activeTab === 'services' && editingService && (
            <form onSubmit={handleSaveService} className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-[#1a202c]">{editingService.id ? 'Edit Service' : 'New Service'}</h1>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setEditingService(null)} className="px-5 py-2 bg-white text-[#4a5568] rounded border border-[#cbd5e0] font-medium text-[15px] hover:bg-[#f8fafc] shadow-sm">Cancel</button>
                  <button type="submit" disabled={isSaving} className="px-5 py-2 bg-[#05a3a4] text-white rounded font-medium text-[15px] hover:bg-[#048889] shadow-sm disabled:opacity-50">Publish</button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] flex flex-col p-8 gap-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Service Name</label>
                    <input required type="text" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4]" value={editingService.name} onChange={(e) => setEditingService({...editingService, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4]" value={editingService.category} onChange={(e) => setEditingService({...editingService, category: e.target.value})}>
                      <option value="massage">Massage</option>
                      <option value="facials">Facials</option>
                      <option value="waxing">Waxing</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Price Range</label>
                    <input required type="text" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4]" value={editingService.priceRange} onChange={(e) => setEditingService({...editingService, priceRange: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Duration</label>
                    <input required type="text" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4]" value={editingService.duration} onChange={(e) => setEditingService({...editingService, duration: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Image URL</label>
                  <input required type="url" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4]" value={editingService.image} onChange={(e) => setEditingService({...editingService, image: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Short Description</label>
                  <textarea required className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] h-24" value={editingService.shortDescription} onChange={(e) => setEditingService({...editingService, shortDescription: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Premium Description (Full details)</label>
                  <textarea required className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4] h-48" value={typeof editingService.premiumDescription === 'string' ? editingService.premiumDescription : editingService.premiumDescription?.join('\\n\\n')} onChange={(e) => setEditingService({...editingService, premiumDescription: e.target.value})} />
                </div>
              </div>
            </form>
          )}

          {/* CATALOGUE LIST */}
          {activeTab === 'catalogue' && !editingProduct && (
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-[#1a202c]">Catalogue</h1>
                <button onClick={() => setEditingProduct({ title: '', price: 0, image: '', priority: productsData.length + 1 })} className="px-5 py-2 bg-white text-[#05a3a4] rounded border border-[#05a3a4] font-medium text-[15px] hover:bg-[#e6fffa] shadow-sm">New Product</button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] overflow-hidden">
                <table className="w-full text-left border-collapse text-[15px]">
                  <thead>
                    <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Priority</th>
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Image</th>
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Title</th>
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Price</th>
                      <th className="py-3 px-6 font-semibold text-[#4a5568] uppercase tracking-wider text-[11px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsData.map(prod => (
                      <tr key={prod.id} className="border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors">
                        <td className="py-4 px-6 text-[#4a5568]">{prod.priority}</td>
                        <td className="py-4 px-6"><img src={prod.image} alt={prod.title} className="w-10 h-10 object-cover rounded" /></td>
                        <td className="py-4 px-6 font-medium text-[#1a202c]">{prod.title}</td>
                        <td className="py-4 px-6 text-[#4a5568]">${prod.price}</td>
                        <td className="py-4 px-6 flex gap-4">
                          <button onClick={() => setEditingProduct(prod)} className="text-[#05a3a4] hover:text-[#048889] font-medium">Edit</button>
                          <button onClick={() => handleDeleteDoc('products', prod.id, setProductsData)} className="text-[#e53e3e] hover:text-[#c53030] font-medium">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {productsData.length === 0 && (<tr><td colSpan={5} className="py-8 px-6 text-center text-[#a0aec0]">No products found.</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CATALOGUE FORM */}
          {activeTab === 'catalogue' && editingProduct && (
            <form onSubmit={handleSaveProduct} className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-[#1a202c]">{editingProduct.id ? 'Edit Product' : 'New Product'}</h1>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setEditingProduct(null)} className="px-5 py-2 bg-white text-[#4a5568] rounded border border-[#cbd5e0] font-medium text-[15px] hover:bg-[#f8fafc] shadow-sm">Cancel</button>
                  <button type="submit" disabled={isSaving} className="px-5 py-2 bg-[#05a3a4] text-white rounded font-medium text-[15px] hover:bg-[#048889] shadow-sm disabled:opacity-50">Publish</button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] flex flex-col p-8 gap-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Product Title</label>
                    <input required type="text" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4]" value={editingProduct.title} onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Price ($)</label>
                    <input required type="number" step="0.01" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4]" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Image URL</label>
                    <input required type="url" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4]" value={editingProduct.image} onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-2">Sort Priority (1 is first)</label>
                    <input required type="number" className="w-full px-3 py-2 border border-[#cbd5e0] rounded bg-[#f8fafc] text-[#2d3748] focus:bg-white focus:outline-none focus:border-[#05a3a4]" value={editingProduct.priority} onChange={(e) => setEditingProduct({...editingProduct, priority: parseInt(e.target.value, 10)})} />
                  </div>
                </div>
              </div>
            </form>
          )}

        </main>
      </div>
    </div>
  );
}
\`;

fs.writeFileSync(path.join(__dirname, 'src', 'pages', 'AdminDashboard.tsx'), code);
