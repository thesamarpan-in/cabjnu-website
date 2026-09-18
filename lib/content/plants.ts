export type Plant = {
  slug: string;
  commonName: string;
  scientificName: string;
  family: string;
  location: string; // real, physical location on JNU campus
  // Path to a real photo you provide, e.g. '/images/plants/opuntia-ficus-indica.jpg'.
  // Leave unset until a real photo exists — the page shows a clean
  // placeholder rather than a fabricated or stock image.
  photo?: string;
  traditionalUse: {
    en: string;
    hi: string;
    // AI-drafted — needs review by someone with Sanskrit training before
    // being treated as final, especially for modern biomedical terms
    // (blood sugar, cholesterol, antioxidant) that have no classical
    // Sanskrit equivalent and were rendered as best-effort approximations.
    sa: string;
  };
};

// Source: JNU campus medicinal plant survey data (physical exhibition
// placards). Common/botanical names and locations are as recorded on
// campus. English traditional-use text has been rephrased into hedged
// "traditionally used for" language, and a few specific disease-cure
// claims (H1N1, Meniere's disease, tinnitus, antifertility/abortifacient
// effects) were removed — see project notes. Hindi and Sanskrit text
// are AI-drafted translations and have NOT been reviewed by a Sanskrit
// speaker — verify before treating as final, especially the Sanskrit,
// since several modern biomedical terms have no classical equivalent.
// Every entry here is evidenceStatus: 'not_established' by default
// (see supabase/migrations/0001_init.sql) until a faculty member adds
// a verified compound/target/paper chain for it.
export const plants: Plant[] = [
  {
    slug: 'opuntia-ficus-indica',
    commonName: 'Prickly Pear Cactus',
    scientificName: 'Opuntia ficus-indica',
    family: 'Cactaceae',
    location: 'In front of School of Molecular Medicine, JNU',
    traditionalUse: {
      en: 'Traditionally used to help regulate blood sugar levels, support immunity and hydration, and manage cholesterol; regarded in folk use as having antioxidant properties.',
      hi: 'पारंपरिक रूप से रक्त शर्करा को नियंत्रित करने, प्रतिरक्षा और जलयोजन बढ़ाने, तथा कोलेस्ट्रॉल प्रबंधन में सहायक माना जाता है; लोक उपयोग में इसे एंटीऑक्सीडेंट गुणों वाला माना जाता है।',
      sa: 'परम्परया रक्तशर्करा-नियमने, रोगप्रतिरोधशक्तिवर्धने, जलांशपोषणे, कोलेस्ट्रॉल-व्यवस्थापने च उपयुज्यते इति मन्यते।',
    },
  },
  {
    slug: 'justicia-adhatoda',
    commonName: 'Adha Thoda (Basika / Vasa)',
    scientificName: 'Justicia adhatoda',
    family: 'Acanthaceae',
    location: 'Near Central Library, JNU',
    traditionalUse: {
      en: 'Traditionally used for skin conditions, wounds, toothache, and acidity, and for cough, piles, constipation, jaundice, and gout. Regarded in folk use as a blood purifier, antiseptic, and anti-aging remedy, and traditionally used for colds, insect stings, inflammation, liver conditions, and as a skin tonic.',
      hi: 'पारंपरिक रूप से त्वचा रोग, घाव, दांत दर्द और अम्लता के लिए, तथा खांसी, बवासीर, कब्ज, पीलिया और गठिया में प्रयुक्त होता है। लोक उपयोग में इसे रक्त शोधक, प्रतिरोधी (एंटीसेप्टिक) और वृद्धावस्था-रोधी माना जाता है, तथा जुकाम, कीड़े के काटने, सूजन, यकृत रोग में और त्वचा टॉनिक के रूप में प्रयुक्त होता है।',
      sa: 'परम्परया त्वग्रोगेषु, व्रणेषु, दन्तशूले, अम्लपित्ते, कासे, अर्शसि, विबन्धे, कामलायां, वातरक्ते च उपयुज्यते। रक्तशोधकत्वेन, व्रणरोपणे च लोकप्रयोगे मन्यते।',
    },
  },
  {
    slug: 'costus-igneus',
    commonName: 'Insulin Plant',
    scientificName: 'Costus igneus',
    family: 'Costaceae',
    location: 'JNU Nursery',
    traditionalUse: {
      en: 'Leaves are traditionally consumed by some people with diabetes, with self-reported reductions in blood glucose levels — this is a folk/anecdotal use, not a clinically established effect. Also traditionally used for rashes, fever, bronchitis, and intestinal worms.',
      hi: 'मधुमेह से पीड़ित कुछ लोग परंपरागत रूप से इसकी पत्तियों का सेवन करते हैं, और रक्त शर्करा में कमी की सूचना स्वयं देते हैं — यह एक लोक/अनुभवजन्य उपयोग है, नैदानिक रूप से स्थापित प्रभाव नहीं। इसे चकत्ते, बुखार, ब्रोंकाइटिस और आंतों के कीड़ों के लिए भी पारंपरिक रूप से उपयोग किया जाता है।',
      sa: 'मधुमेहरोगिणः केचन परम्परया अस्य पत्राणि सेवन्ते, रक्तशर्करा-ह्रासं स्वयमेव कथयन्ति — इदं लोकानुभवाधारितं प्रयोगमात्रम्, न तु वैद्यकीयदृष्ट्या प्रमाणितम्। कुष्ठे, ज्वरे, कासश्वासे, कृमिरोगे च परम्परया उपयुज्यते।',
    },
  },
  {
    slug: 'coleus-scutellarioides',
    commonName: 'Coleus',
    scientificName: 'Coleus scutellarioides',
    family: 'Lamiaceae',
    location: 'JNU Nursery',
    traditionalUse: {
      en: 'A folk medicinal plant traditionally used for malarial fever, liver disorders, kidney and bladder stones, cough, chronic asthma, hiccups, bronchitis, intestinal worms, colic, convulsions, and epilepsy.',
      hi: 'यह एक लोक औषधीय पौधा है, जो पारंपरिक रूप से मलेरिया बुखार, यकृत विकार, गुर्दे और मूत्राशय की पथरी, खांसी, दीर्घकालिक दमा, हिचकी, ब्रोंकाइटिस, आंतों के कीड़े, पेट दर्द और मिर्गी के दौरे में उपयोग किया जाता है।',
      sa: 'एषा लोकौषधीया वनस्पतिः परम्परया विषमज्वरे, यकृद्विकारे, अश्मर्याम्, कासे, चिरकालिकश्वासरोगे, हिध्मायां, कृमिरोगे, शूले, अपस्मारे च उपयुज्यते।',
    },
  },
  {
    slug: 'citrus-limon',
    commonName: 'Lemon',
    scientificName: 'Citrus limon',
    family: 'Rutaceae',
    location: 'JNU Nursery',
    traditionalUse: {
      en: 'A well-established dietary source of vitamin C, historically used to prevent and treat scurvy. Also traditionally used to help ease common cold and flu symptoms.',
      hi: 'विटामिन सी का एक सुस्थापित आहारिक स्रोत, जो ऐतिहासिक रूप से स्कर्वी रोग की रोकथाम और उपचार में प्रयुक्त होता रहा है। सामान्य जुकाम और फ्लू के लक्षणों को कम करने में भी पारंपरिक रूप से सहायक माना जाता है।',
      sa: 'सी-जीवनसत्त्वस्य सुस्थापितः आहारस्रोतः, ऐतिहासिकदृष्ट्या स्कर्वीरोगस्य निवारणे चिकित्सायां च उपयुक्तः। पीनसे सहायकत्वेन परम्परया मन्यते।',
    },
  },
  {
    slug: 'moringa-oleifera',
    commonName: 'Sahjan / Drumstick',
    scientificName: 'Moringa oleifera',
    family: 'Moringaceae',
    location: 'JNU Nursery',
    traditionalUse: {
      en: 'Widely used nutritionally across many cultures; traditionally associated with supporting hemoglobin levels, healthy blood pressure and cholesterol, liver and kidney health, skin health, weight management, metabolism, blood sugar regulation, mood and stress, thyroid function, and lactation support in nursing mothers.',
      hi: 'अनेक संस्कृतियों में पोषण हेतु व्यापक रूप से उपयोग किया जाता है; पारंपरिक रूप से हीमोग्लोबिन स्तर, रक्तचाप और कोलेस्ट्रॉल, यकृत और गुर्दे के स्वास्थ्य, त्वचा स्वास्थ्य, वजन प्रबंधन, चयापचय, रक्त शर्करा नियंत्रण, मनोदशा और तनाव, थायरॉइड कार्य, तथा स्तनपान कराने वाली माताओं में दुग्ध उत्पादन से जोड़ा जाता है।',
      sa: 'बहुषु संस्कृतिषु पोषणार्थं व्यापकतया उपयुज्यते; परम्परया रक्तहीमोग्लोबिन-वर्धने, रक्तचाप-कोलेस्ट्रॉल-नियमने, यकृद्वृक्कस्वास्थ्ये, त्वक्स्वास्थ्ये, स्थौल्यनियमने, चयापचये, रक्तशर्करानियमने, मनःस्थैर्ये, थायरॉइड-कार्ये, स्तन्यवर्धने च सम्बध्यते।',
    },
  },
  {
    slug: 'hamelia-patens',
    commonName: 'Texas Firebush',
    scientificName: 'Hamelia patens',
    family: 'Rubiaceae',
    location: 'JNU Nursery',
    traditionalUse: {
      en: "Used in folk herbal medicine for athlete's foot, skin lesions, and insect bites, and traditionally for inflammation, rheumatism, headache, asthma, and dysentery.",
      hi: 'लोक हर्बल चिकित्सा में एथलीट फुट, त्वचा घावों और कीड़ों के काटने के लिए, तथा पारंपरिक रूप से सूजन, गठिया, सिरदर्द, दमा और पेचिश के लिए उपयोग किया जाता है।',
      sa: 'लोकौषधचिकित्सायां पादत्वक्विकारे, त्वग्व्रणे, कीटदंशे, तथा परम्परया शोथे, सन्धिवाते, शिरःशूले, श्वासरोगे, प्रवाहिकायां च उपयुज्यते।',
    },
  },
  {
    slug: 'cassia-fistula',
    commonName: 'Amaltas',
    scientificName: 'Cassia fistula',
    family: 'Caesalpiniaceae',
    location: 'Near School of Sanskrit and Indic Studies, JNU',
    traditionalUse: {
      en: "Traditionally used as a gentle natural laxative — the pulp of the ripe fruit pods is traditionally used for relief from constipation, an effect associated with the plant's anthraquinone compounds.",
      hi: 'पारंपरिक रूप से एक सौम्य प्राकृतिक रेचक के रूप में उपयोग किया जाता है — पके फल की फली का गूदा परंपरागत रूप से कब्ज से राहत के लिए उपयोग किया जाता है, यह प्रभाव पौधे के एन्थ्राक्विनोन यौगिकों से जुड़ा माना जाता है।',
      sa: 'परम्परया सौम्य-स्वाभाविक-विरेचनरूपेण उपयुज्यते — पक्वफलस्य गुदः विबन्धनिवारणार्थं परम्परया प्रयुज्यते, अयं प्रभावः वनस्पतेः एन्थ्राक्विनोन-द्रव्यैः सम्बद्धः इति मन्यते।',
    },
  },
  {
    slug: 'dianthus-praecox',
    commonName: 'Carnation',
    scientificName: 'Dianthus praecox',
    family: 'Caryophyllaceae',
    location: 'In front of School of Life Sciences, JNU',
    traditionalUse: {
      en: 'Used in folk herbal traditions as a bitter digestive and urinary tonic. Traditionally applied externally to skin inflammation and swelling.',
      hi: 'लोक हर्बल परंपराओं में एक कड़वे पाचक और मूत्र-टॉनिक के रूप में उपयोग किया जाता है। पारंपरिक रूप से त्वचा की सूजन पर बाहरी रूप से लगाया जाता है।',
      sa: 'लोकौषधपरम्परासु तिक्तपाचकत्वेन, मूत्रलत्वेन च उपयुज्यते। त्वक्शोथे बाह्यप्रयोगेण परम्परया लेपनं क्रियते।',
    },
  },
  {
    slug: 'canna-indica',
    commonName: 'Indian Shot',
    scientificName: 'Canna indica',
    family: 'Cannaceae',
    location: 'JNU Nursery',
    traditionalUse: {
      en: 'Traditionally used for earache, with the flowers folklorically associated with eye conditions. Some preclinical laboratory studies have reported analgesic activity from leaf extracts and anthelmintic activity from rhizome extracts against the earthworm model Pheretima posthuma — findings from animal/lab models, not yet clinical evidence in humans.',
      hi: 'पारंपरिक रूप से कान दर्द के लिए उपयोग किया जाता है, तथा लोक मान्यता में इसके फूलों को नेत्र रोगों से जोड़ा जाता है। कुछ प्रारंभिक प्रयोगशाला अध्ययनों में पत्तियों के अर्क से दर्दनाशक प्रभाव तथा प्रकंद के अर्क से केंचुआ मॉडल (Pheretima posthuma) पर कृमिनाशक प्रभाव पाया गया है — यह पशु/प्रयोगशाला मॉडल के निष्कर्ष हैं, मनुष्यों में नैदानिक प्रमाण अभी उपलब्ध नहीं है।',
      sa: 'परम्परया कर्णशूले उपयुज्यते, पुष्पाणि च लोकमान्यतया नेत्ररोगैः सम्बध्यन्ते। केषुचित् प्रारम्भिकप्रयोगशालाध्ययनेषु पत्रसारस्य वेदनाहरत्वं, कन्दसारस्य च कृमिघ्नत्वं Pheretima posthuma इति भूकृमौ दृष्टम् — इदं पशु-प्रयोगशाला-आधारितं फलम्, न तु मनुष्येषु वैद्यकीयदृष्ट्या प्रमाणितम्।',
    },
  },
];
