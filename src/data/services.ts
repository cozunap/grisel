export interface ServiceData {
  id: string;
  category: 'massage' | 'facials' | 'waxing';
  name: string;
  shortDescription: string;
  premiumDescription: string[];
  priceRange: string;
  duration: string;
  image: string;
}

export const servicesData: ServiceData[] = [
  {
    id: 'aromatherapy-massage',
    category: 'massage',
    name: 'Aromatherapy Massage',
    shortDescription: 'Massage technique combined with essential oils to relieve physical tension and emotional stress.',
    premiumDescription: [
      'Experience the ultimate synergy of touch and scent with our Signature Aromatherapy Massage. This premium treatment utilizes carefully selected, pure essential oils tailored to your specific emotional and physical needs. As the therapeutic aromas envelop your senses, our expert therapists use fluid, rhythmic strokes to release deep-seated tension, melt away stress, and restore your body’s natural harmony.',
      'Perfect for those seeking both physical relief and mental clarity, this holistic journey goes beyond a standard massage. The botanical properties of the oils penetrate deeply to detoxify and nourish the skin, while the calming environment of our Maryland spa ensures you leave feeling profoundly relaxed, rejuvenated, and centered.'
    ],
    priceRange: '$$',
    duration: '60 - 90 min',
    image: 'https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'thai-herbal-balls-massage',
    category: 'massage',
    name: 'Thai Herbal Balls Massage',
    shortDescription: 'Deep-pressure Thai massage followed by a warm herbal poultice to soothe muscle tension and aches.',
    premiumDescription: [
      'Embark on an ancient healing tradition with our Thai Herbal Balls Massage. This specialized therapy begins with targeted, deep-pressure techniques to release tight muscles and improve energy flow. Following the massage, a warm, steamed poultice filled with a fragrant blend of traditional Thai herbs—such as lemongrass, ginger, and turmeric—is firmly rolled and pressed along your body’s energy pathways.',
      'The soothing heat from the herbal balls penetrates deep into the muscles to alleviate chronic pain, reduce inflammation, and promote profound relaxation. This luxurious treatment is an exceptional choice for athletes, those with chronic tension, or anyone looking to experience a deeply restorative, therapeutic escape at our premium spa.'
    ],
    priceRange: '$$$',
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'hot-stone-massage',
    category: 'massage',
    name: 'Hot Stone Massage',
    shortDescription: 'Heated stones relax muscle for deeper work, easing pain and improving circulation.',
    premiumDescription: [
      'Melt into a state of pure tranquility with our Hot Stone Wellness Ritual. Smooth, heated basalt stones are strategically placed along the spine and energy centers of the body, allowing their deeply penetrating warmth to prepare your muscles for therapeutic bodywork. The heat dilates blood vessels, encouraging blood flow throughout the body and easing muscle stiffness without the need for intense pressure.',
      'As the therapist glides the warm stones over your skin, the comforting heat melts away tension and induces a deeply meditative state. Ideal for those suffering from stress, insomnia, or muscle aches, this premium treatment offers a luxurious, grounding experience that leaves your body feeling supple and your mind completely at peace.'
    ],
    priceRange: '$$$',
    duration: '60 - 90 min',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'detox-mud-facial',
    category: 'facials',
    name: 'Detox Mud Facial',
    shortDescription: 'An intensive purifying treatment that reduces inflammation and blemishes and detoxifies the skin.',
    premiumDescription: [
      'Revitalize your complexion with our high-end Detox Mud Facial, a deeply purifying treatment designed to extract impurities and balance the skin. Utilizing premium, mineral-rich therapeutic mud, this facial acts as a powerful magnet to draw out toxins, excess oils, and environmental pollutants that can cause breakouts and dullness. The intensive formula also delivers essential nutrients directly into the pores.',
      'Our skilled estheticians pair this detoxifying masque with gentle extractions and a soothing facial massage, reducing inflammation and refining the skin’s texture. Emerge with a visibly clearer, brighter, and more resilient complexion. This is the ultimate reset for stressed or congested skin, performed in the serene environment of our luxury beauty lounge.'
    ],
    priceRange: '$$',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1731514771613-991a02407132?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'hydrating-paraffin-facial',
    category: 'facials',
    name: 'Hydrating Paraffin Facial',
    shortDescription: 'A warm paraffin masque that draws out toxins and infuses skin with minerals for deep hydration.',
    premiumDescription: [
      'Quench thirsty, depleted skin with our luxurious Hydrating Paraffin Facial. This deeply nourishing treatment begins with a gentle exfoliation, followed by the application of customized, moisture-rich serums. A warm, enveloping paraffin wax masque is then applied over the face. As the wax gently heats the skin, it opens the pores and creates a seal that forces the potent hydrating ingredients deep into the dermal layers.',
      'The soothing warmth not only promotes intense moisture retention but also stimulates blood circulation, leaving your skin with a radiant, youthful glow. Perfect for combating the harsh effects of seasonal changes or environmental stress, this premium facial restores elasticity, plumps fine lines, and delivers an unparalleled level of hydration and comfort.'
    ],
    priceRange: '$$$',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'detox-seaweed-facial',
    category: 'facials',
    name: 'Detox Seaweed Facial',
    shortDescription: 'Mineral- and vitamin-rich seaweed that clears impurities and leaves skin soft, smooth, and hydrated.',
    premiumDescription: [
      'Harness the restorative power of the ocean with our Detox Seaweed Facial. This elite anti-aging and purifying treatment uses premium, freshly harvested seaweed packed with essential vitamins, minerals, and amino acids. The nutrient-dense seaweed works actively to oxygenate the skin, boost cellular turnover, and dramatically improve skin tone and elasticity while clearing away impurities.',
      'Accompanied by a lifting facial massage, this treatment delivers a surge of hydration and antioxidants that protect against environmental damage. The result is a luminous, incredibly soft, and tightened complexion. Experience this five-star spa treatment to achieve a flawless, healthy glow that radiates from within.'
    ],
    priceRange: '$$$',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1570172619644-def31460965e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'brazilian-wax',
    category: 'waxing',
    name: 'Brazilian Wax',
    shortDescription: 'Full removal of pubic hair from the pelvic region, done cleanly and quickly by a professional.',
    premiumDescription: [
      'Experience the highest standard of grooming with our premium Brazilian Wax service. At Grisel Beauty Spa, we understand that waxing requires meticulous care and a gentle touch. Our highly trained professionals use top-tier, hard wax formulated specifically for sensitive skin, ensuring a process that is as quick and comfortable as possible while minimizing irritation and ingrown hairs.',
      'Enjoy complete hair removal from the front to the back in a pristine, private, and hygienic environment. We prioritize your comfort and privacy above all else, leaving your skin flawlessly smooth and impeccably clean. Trust our experts to provide a superior waxing experience that sets the benchmark for quality in Maryland.'
    ],
    priceRange: '$$',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1700760934166-4c766d708139?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'half-leg-waxing',
    category: 'waxing',
    name: 'Half Leg Waxing',
    shortDescription: 'Waxing to just above the knees, including toes and feet if requested.',
    premiumDescription: [
      'Achieve flawlessly smooth skin with our professional Half Leg Waxing service. Perfect for preparing for a beach vacation or simply enjoying everyday confidence, this treatment covers the lower leg up to just above the knee. We use high-quality, soothing wax that grasps even the finest hairs without adhering to the skin, resulting in less discomfort and longer-lasting smoothness compared to shaving.',
      'Our estheticians finish the service with a calming, botanical lotion to reduce redness and hydrate the freshly waxed skin. If desired, the service can also include the feet and toes for a comprehensive, polished look. Step out with confidence and enjoy the luxurious, long-lasting results of our expert waxing techniques.'
    ],
    priceRange: '$',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'eyelashes-tinting',
    category: 'waxing',
    name: 'Eyelashes Tinting',
    shortDescription: 'Gives lashes definition so you can go without mascara for a few weeks at a time.',
    premiumDescription: [
      'Wake up every morning with perfectly defined eyes. Our Eyelash Tinting service is a premium enhancement designed to darken and accentuate your natural lashes. Using a safe, vegetable-based dye formulated exclusively for the sensitive eye area, our experts customize the tint color to complement your complexion and hair tone perfectly.',
      'This quick and relaxing treatment instantly creates the illusion of thicker, longer lashes, allowing you to forgo mascara for weeks at a time. Ideal for active lifestyles, vacations, or simply streamlining your beauty routine, this effortless enhancement delivers stunning, high-impact results with zero daily maintenance.'
    ],
    priceRange: '$',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a1fbaf6928ea?auto=format&fit=crop&w=1200&q=80'
  }
];
