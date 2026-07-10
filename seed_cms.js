import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, writeBatch, collection } from "firebase/firestore";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
  apiKey: "AIzaSyB4_cQGCJhgWwp38eKatB0rHFqPIGrcMko",
  authDomain: "griselspa.firebaseapp.com",
  projectId: "griselspa",
  storageBucket: "griselspa.firebasestorage.app",
  messagingSenderId: "390820306890",
  appId: "1:390820306890:web:65a7b5344e31f75b04f933"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedCMS = async () => {
  try {
    const batch = writeBatch(db);

    // About Page
    const aboutRef = doc(db, "content", "about");
    batch.set(aboutRef, {
      heroTitle: "Revitalise your senses and refresh your mind!",
      heroSubtitle: "GRISEL BEAUTY SPA is the ideal solution for those looking to relax and find balance of health in all physical, psychological, mental, and spiritual levels.",
      philosophyText: "We provide noninvasive novel treatments with the latest trends in spa and alternative therapies to restore and maintain health. We combine science and techniques of alternative therapies for health care, utilizing high-tech appliances and products of aesthetic beauty to achieve the best benefits for your facial and body needs.\n\nWe are the best choice in price, quality, and professionalism. Grisel Beauty Spa helps you maintain the fundamental balance of your life through treatments and therapies designed for the care, balance, and restoration of your body, helping to achieve the rest of mind and body.",
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

    // Membership Page
    const membershipRef = doc(db, "content", "membership");
    batch.set(membershipRef, {
      heroTitle: "Make wellness a habit, not a splurge",
      heroSubtitle: "Monthly membership means built-in service credits, member pricing, and priority booking, so your next facial, massage, or wax is already taken care of.",
      plan1Title: "Essentials",
      plan1Price: "$89",
      plan1Perks: "1 signature service credit each month (any facial, massage, or Brazilian wax)\n10% off additional services booked same visit\nUnused credits roll over up to 1 month\nMember pricing on gift cards",
      plan2Title: "Renewal",
      plan2Price: "$149",
      plan2Perks: "2 service credits each month, mix and match any treatment\n15% off additional services and retail add-ons\nPriority access to Saturday booking windows\nUnused credits roll over up to 2 months",
      plan3Title: "Unlimited Wellness",
      plan3Price: "$259",
      plan3Perks: "Unlimited waxing services\n2 facial or massage credits each month\n20% off everything else in the treatment menu\nOne guest pass per quarter",
      footerNote: "Membership pricing and perks above are default starter tiers for planning purposes. Confirm final pricing, credit rules, and cancellation terms with Grisel before this goes live.",
      ctaTitle: "Ready to become a member?",
      ctaSubtitle: "Call, message, or book your first session and we'll get you set up on the plan that fits."
    });

    // Gift Cards Page
    const giftCardsRef = doc(db, "content", "giftcards");
    batch.set(giftCardsRef, {
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

    // Contact Page
    const contactRef = doc(db, "content", "contact");
    batch.set(contactRef, {
      heroTitle: "Contact Us",
      heroSubtitle: "Questions about a treatment, a gift card, or your appointment? Send a message or call us directly.",
      address: "1620 Elton Rd, Suite 205\nSilver Spring, MD 20903",
      phone: "(240) 701-0731",
      phoneLink: "tel:2407010731",
      hours: "Saturday: 10:00 am - 7:00 pm\nMon - Fri: By appointment",
      mapUrl: "https://www.google.com/maps?q=1620+Elton+Rd+Suite+205+Silver+Spring+MD+20903&output=embed"
    });

    await batch.commit();
    console.log("Seeded static pages (About, Membership, GiftCards, Contact)");

    // Seed Products from shop_data.json
    const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'shop_data.json'), 'utf8'));
    
    for (let i = 0; i < productsData.length; i++) {
      const p = productsData[i];
      // Create a slug ID
      const id = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await setDoc(doc(db, "products", id), {
        title: p.title,
        price: p.price,
        image: p.image || "",
        priority: i + 1 // initial priority is just its array index
      });
    }

    console.log("Seeded Products from shop_data.json");
    process.exit(0);

  } catch (error) {
    console.error("Error seeding CMS data:", error);
    process.exit(1);
  }
};

seedCMS();
