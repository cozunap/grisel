import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

const seedData = async () => {
  try {
    await setDoc(doc(db, "content", "home-en"), {
      "title": "Grisel Beauty Spa",
      "heroTitle": "Give yourself a moment of wellness",
      "heroSubtitle": "A quiet, personal-attention spa built around one idea: rest is not a luxury, it is maintenance. Facials, massage therapy, and waxing, delivered with care and unhurried attention.",
      "approachTitle": "Treatments built around you, not a menu",
      "approachBody": "Every session starts with a conversation about your skin, your stress, and what you need from the hour. Grisel Beauty Spa has spent years earning a reputation across Maryland, DC, and Virginia for quality products, a clean and calm space, and treatments that are never rushed.",
      "readyTitle": "Ready for a reset?",
      "readyBody": "Book your session online or give us a call to find the perfect treatment.",
      "bookNow": "Book Now",
      "exploreMenu": "Explore Menu"
    });
    console.log("Seeded EN");

    await setDoc(doc(db, "content", "home-es"), {
      "title": "Grisel Beauty Spa",
      "heroTitle": "Regálate un momento de bienestar",
      "heroSubtitle": "Un spa tranquilo y de atención personalizada creado bajo una sola idea: el descanso no es un lujo, es mantenimiento. Faciales, masajes terapéuticos y depilación, brindados con cuidado y atención sin prisas.",
      "approachTitle": "Tratamientos diseñados para ti, no un simple menú",
      "approachBody": "Cada sesión comienza con una conversación sobre tu piel, tu estrés y lo que necesitas en esa hora. Grisel Beauty Spa ha dedicado años a ganarse una reputación en Maryland, DC y Virginia por productos de calidad, un espacio limpio y tranquilo, y tratamientos que nunca se apresuran.",
      "readyTitle": "¿Lista para un reinicio?",
      "readyBody": "Reserva tu sesión en línea o llámanos para encontrar el tratamiento perfecto.",
      "bookNow": "Reservar Ahora",
      "exploreMenu": "Explorar Menú"
    });
    console.log("Seeded ES");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

seedData();
