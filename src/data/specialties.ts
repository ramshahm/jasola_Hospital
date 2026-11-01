import type { Localized } from '@/data/types';

export type SpecialtyKey =
  | 'general'
  | 'gastro'
  | 'gynae'
  | 'derm'
  | 'physio'
  | 'psych'
  | 'cardio'
  | 'respiratory'
  | 'dialysis';

export interface Specialty {
  key: SpecialtyKey;
  name: Localized;
  description: Localized;
  highlights: Localized[];
  image: string;
}

export const SPECIALTIES: Record<SpecialtyKey, Specialty> = {
  general: {
    key: 'general',
    name: { en: 'General Physician & Health Checkup', hi: 'जनरल फिजिशियन एवं स्वास्थ्य जांच' },
    description: {
      en: 'Everyday illnesses, fever and infections, diabetes, blood pressure and preventive checkups for the whole family.',
      hi: 'रोज़मर्रा की बीमारियाँ, बुखार और संक्रमण, डायबिटीज़, ब्लड प्रेशर और पूरे परिवार की नियमित जांच।',
    },
    highlights: [
      { en: 'Fever & infection care', hi: 'बुखार व संक्रमण का इलाज' },
      { en: 'Diabetes & blood pressure', hi: 'डायबिटीज़ व ब्लड प्रेशर' },
      { en: 'Preventive health checkups', hi: 'नियमित स्वास्थ्य जांच' },
    ],
    image: 'https://images.pexels.com/photos/7578800/pexels-photo-7578800.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  gastro: {
    key: 'gastro',
    name: { en: 'Gastroenterology & Liver Care', hi: 'गैस्ट्रोएंटेरोलॉजी एवं लिवर केयर' },
    description: {
      en: 'Digestive health, liver disease management and advanced surgical gastroenterology with liver transplant expertise.',
      hi: 'पाचन स्वास्थ्य, लिवर रोगों का इलाज और लिवर ट्रांसप्लांट विशेषज्ञता के साथ उन्नत सर्जिकल गैस्ट्रोएंटेरोलॉजी।',
    },
    highlights: [
      { en: 'Liver disease management', hi: 'लिवर रोगों का इलाज' },
      { en: 'Digestive & stomach health', hi: 'पेट व पाचन स्वास्थ्य' },
      { en: 'Liver transplant consultation', hi: 'लिवर ट्रांसप्लांट परामर्श' },
    ],
    image: 'https://images.pexels.com/photos/8471784/pexels-photo-8471784.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  gynae: {
    key: 'gynae',
    name: { en: 'Gynaecology & Maternity', hi: 'स्त्री रोग एवं प्रसूति' },
    description: {
      en: "Women's health, pregnancy care and ultrasound scans with caring, experienced gynaecologists.",
      hi: 'महिलाओं का स्वास्थ्य, गर्भावस्था की देखभाल और अल्ट्रासाउंड जांच, अनुभवी स्त्री रोग विशेषज्ञों द्वारा।',
    },
    highlights: [
      { en: 'Pregnancy & antenatal care', hi: 'गर्भावस्था व प्रसव पूर्व देखभाल' },
      { en: 'Ultrasound scans', hi: 'अल्ट्रासाउंड जांच' },
      { en: "Women's health consultations", hi: 'महिला स्वास्थ्य परामर्श' },
    ],
    image: 'https://images.pexels.com/photos/7089045/pexels-photo-7089045.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  derm: {
    key: 'derm',
    name: { en: 'Dermatology & Hair Care', hi: 'त्वचा एवं बाल चिकित्सा' },
    description: {
      en: 'Skin treatments, hair care and aesthetic dermatology for healthy, confident skin and hair.',
      hi: 'स्वस्थ और निखरी त्वचा व बालों के लिए त्वचा उपचार, हेयर केयर और कॉस्मेटिक डर्मेटोलॉजी।',
    },
    highlights: [
      { en: 'Skin allergy & acne care', hi: 'एलर्जी व मुंहासों का इलाज' },
      { en: 'Hair fall treatment', hi: 'बालों के झड़ने का इलाज' },
      { en: 'Aesthetic skin care', hi: 'सौंदर्य त्वचा देखभाल' },
    ],
    image: 'https://images.pexels.com/photos/7446665/pexels-photo-7446665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  physio: {
    key: 'physio',
    name: { en: 'Physiotherapy & Spine Care', hi: 'फिजियोथेरेपी एवं स्पाइन केयर' },
    description: {
      en: 'Mobility, pain relief and rehabilitation for back, neck, joints and post-surgery recovery.',
      hi: 'कमर, गर्दन, जोड़ों के दर्द और सर्जरी के बाद रिकवरी के लिए गतिशीलता, दर्द से राहत और पुनर्वास।',
    },
    highlights: [
      { en: 'Back & neck pain relief', hi: 'कमर व गर्दन के दर्द से राहत' },
      { en: 'Mobility & joint rehab', hi: 'गतिशीलता व जोड़ों का पुनर्वास' },
      { en: 'Post-surgery recovery', hi: 'सर्जरी के बाद रिकवरी' },
    ],
    image: 'https://images.pexels.com/photos/20860601/pexels-photo-20860601.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  psych: {
    key: 'psych',
    name: { en: 'Psychology Counselling', hi: 'मनोवैज्ञानिक परामर्श' },
    description: {
      en: 'Confidential counselling for stress, anxiety, mood and family wellbeing.',
      hi: 'तनाव, चिंता, मूड और पारिवारिक भलाई के लिए गोपनीय परामर्श।',
    },
    highlights: [
      { en: 'Stress & anxiety support', hi: 'तनाव व चिंता में सहायता' },
      { en: 'Mood & sleep concerns', hi: 'मूड व नींद की समस्याएं' },
      { en: 'Family counselling', hi: 'पारिवारिक परामर्श' },
    ],
    image: 'https://images.pexels.com/photos/9064680/pexels-photo-9064680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  cardio: {
    key: 'cardio',
    name: { en: 'Heart Care & ECG', hi: 'हृदय देखभाल एवं ECG' },
    description: {
      en: 'ECG, blood pressure monitoring and heart health checkups with rapid referral when needed.',
      hi: 'ECG, ब्लड प्रेशर मॉनिटरिंग और हृदय स्वास्थ्य जांच, ज़रूरत पड़ने पर तुरंत रेफरल के साथ।',
    },
    highlights: [
      { en: 'ECG & heart checkups', hi: 'ECG व हृदय जांच' },
      { en: 'Blood pressure monitoring', hi: 'ब्लड प्रेशर मॉनिटरिंग' },
      { en: 'Cardiac referral support', hi: 'हृदय रोग रेफरल सहायता' },
    ],
    image: 'https://images.pexels.com/photos/1093161/pexels-photo-1093161.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  respiratory: {
    key: 'respiratory',
    name: { en: 'Respiratory Care', hi: 'श्वसन रोग चिकित्सा' },
    description: {
      en: 'Cough, asthma, breathing problems and chest care with oxygen support available round the clock.',
      hi: 'खांसी, अस्थमा, सांस की तकलीफ़ और छाती की देखभाल, 24 घंटे ऑक्सीजन सहायता के साथ।',
    },
    highlights: [
      { en: 'Asthma & chronic cough', hi: 'अस्थमा व पुरानी खांसी' },
      { en: 'Chest X-ray review', hi: 'छाती के एक्स-रे की जांच' },
      { en: 'Oxygen support 24/7', hi: '24/7 ऑक्सीजन सहायता' },
    ],
    image: 'https://images.pexels.com/photos/4226259/pexels-photo-4226259.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  dialysis: {
    key: 'dialysis',
    name: { en: 'Dialysis & Nephrology', hi: 'डायलिसिस एवं नेफ्रोलॉजी' },
    description: {
      en: '24/7 dialysis facility with nephrology support and surgical access care.',
      hi: 'नेफ्रोलॉजी सहायता और सर्जिकल एक्सेस देखभाल के साथ 24/7 डायलिसिस सुविधा।',
    },
    highlights: [
      { en: 'Nephrology support', hi: 'नेफ्रोलॉजी सहायता' },
      { en: 'AV fistula surgery', hi: 'AV फिस्टुला सर्जरी' },
      { en: 'ICU & oxygen backup', hi: 'ICU व ऑक्सीजन बैकअप' },
    ],
    image: 'https://images.pexels.com/photos/6129676/pexels-photo-6129676.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
};

export const SERVICE_SPECIALTIES = (Object.values(SPECIALTIES) as Specialty[]).filter(
  (specialty) => specialty.key !== 'dialysis',
);
