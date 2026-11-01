import type { Localized } from '@/data/types';
import type { SpecialtyKey } from '@/data/specialties';

export interface Leader {
  id: string;
  name: string;
  role: Localized;
  credentials: Localized;
  photo: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: SpecialtyKey;
  credentials: Localized;
  timing: Localized;
}

export const LEADERS: Leader[] = [
  // {
  //   id: 'mohammad-nasir',
  //   name: 'Mohammad Nasir',
  //   role: {
  //     en: 'Founder & Chairman, Al Mannat Hospital Shaheen Bagh',
  //     hi: 'संस्थापक एवं अध्यक्ष, अल मन्नत हॉस्पिटल शाहीन बाग',
  //   },
  //   credentials: { en: 'Founder & Chairman', hi: 'संस्थापक एवं अध्यक्ष' },
  //   photo: 'https://i.ibb.co/gFbWdW6J/IMG-20261101-WA0002-1.jpg',
  // },


{
    id: 'mohammad-nasir',
    name: 'Mohammad Nasir',
    role: {
      en: 'Founder & Chairman, Al Mannat Hospital Shaheen Bagh',
      hi: 'संस्थापक एवं अध्यक्ष, अल मन्नत हॉस्पिटल शाहीन बाग',
    },
    credentials: { en: 'Founder & Chairman', hi: 'संस्थापक एवं अध्यक्ष' },
    photo: 'https://i.ibb.co/7NTB48q1/IMG-20261101-WA0002-1.jpg',
},


  {
    id: 'imran-khan',
    name: 'Dr. Imran Khan',
    role: { en: 'Director, Al Mannat Hospital', hi: 'निदेशक, अल मन्नत हॉस्पिटल' },
    credentials: {
      en: 'MBBS, General Physician & Director',
      hi: 'MBBS, जनरल फिजिशियन एवं निदेशक',
    },
    photo: 'https://i.ibb.co/zhHxLQxx/IMG-20261020-WA0063.jpg',
  },
  {
    id: 'furkan-khan',
    name: 'Dr. Furkan Khan',
    role: { en: 'Director, Al Mannat Hospital Shaheen Bagh', hi: 'निदेशक, अल मन्नत हॉस्पिटल शाहीन बाग' },
    credentials: {
      en: 'MBBS, General Physician & Director',
      hi: 'MBBS, जनरल फिजिशियन एवं निदेशक',
    },
    photo: 'https://i.ibb.co/qLgsT6tC/IMG-20261020-WA0064.jpg',
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'tabassum-shafi',
    name: 'Dr. Tabassum Shafi',
    specialty: 'gynae',
    credentials: { en: 'Gynaecologist', hi: 'स्त्री रोग विशेषज्ञ' },
    timing: { en: '6:00 PM - 9:00 PM, Everyday', hi: 'शाम 6:00 - रात 9:00, प्रतिदिन' },
  },
  {
    id: 'ansari',
    name: 'Dr. Ansari',
    specialty: 'gastro',
    credentials: {
      en: 'MBBS, MS, MCh (Surgical Gastroenterology & Liver Transplant)',
      hi: 'MBBS, MS, MCh (सर्जिकल गैस्ट्रोएंटेरोलॉजी एवं लिवर ट्रांसप्लांट)',
    },
    timing: { en: '7:00 PM - 10:00 PM', hi: 'शाम 7:00 - रात 10:00' },
  },
  {
    id: 'amir-wasim',
    name: 'Dr. Amir Wasim',
    specialty: 'general',
    credentials: { en: 'MBBS, MD', hi: 'MBBS, MD' },
    timing: { en: '5:00 PM - 10:00 PM, Everyday', hi: 'शाम 5:00 - रात 10:00, प्रतिदिन' },
  },
  {
    id: 's-shah',
    name: 'Dr. S. Shah',
    specialty: 'derm',
    credentials: {
      en: 'MD, PhD Dermatology, MS Psychology',
      hi: 'MD, PhD डर्मेटोलॉजी, MS साइकोलॉजी',
    },
    timing: { en: 'Sunday, 6:00 PM - 8:00 PM', hi: 'रविवार, शाम 6:00 - 8:00' },
  },
  {
    id: 'farhat-jabeen',
    name: 'Dr. Farhat Jabeen',
    specialty: 'physio',
    credentials: { en: 'Physiotherapist', hi: 'फिजियोथेरेपिस्ट' },
    timing: { en: '9:00 AM - 2:00 PM', hi: 'सुबह 9:00 - दोपहर 2:00' },
  },
  {
    id: 'md-javed-khan',
    name: 'Dr. Md Javed Khan',
    specialty: 'derm',
    credentials: { en: 'Dermatologist', hi: 'त्वचा रोग विशेषज्ञ' },
    timing: { en: 'Every Sunday', hi: 'हर रविवार' },
  },
  {
    id: 'naseer-ahmed',
    name: 'Dr. Naseer Ahmed',
    specialty: 'general',
    credentials: {
      en: 'MBBS, General Physician (12 Yrs Apollo)',
      hi: 'MBBS, जनरल फिजिशियन (अपोलो में 12 वर्ष)',
    },
    timing: { en: '8:00 PM - 11:00 PM', hi: 'रात 8:00 - 11:00' },
  },
  {
    id: 'iram-islam',
    name: 'Dr. Iram Islam',
    specialty: 'gynae',
    credentials: { en: 'Gynaecologist', hi: 'स्त्री रोग विशेषज्ञ' },
    timing: { en: '9:00 AM - 3:00 PM', hi: 'सुबह 9:00 - दोपहर 3:00' },
  },
  {
    id: 'arshad-parvez',
    name: 'Dr. Arshad Parvez (PT)',
    specialty: 'physio',
    credentials: {
      en: 'BPT, MIAP, Sr. Consultant Physiotherapist',
      hi: 'BPT, MIAP, सीनियर कंसल्टेंट फिजियोथेरेपिस्ट',
    },
    timing: { en: 'Evening 5:00 PM - 9:00 PM', hi: 'शाम 5:00 - रात 9:00' },
  },
];
