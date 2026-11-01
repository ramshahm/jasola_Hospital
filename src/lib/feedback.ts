import { supabase } from '@/lib/supabase';

export class AdminAuthError extends Error {
  constructor(message = 'Invalid admin credentials') {
    super(message);
    this.name = 'AdminAuthError';
  }
}

export interface PatientFeedback {
  id: string;
  patient_name: string;
  phone_number: string;
  rating: number;
  feedback_text: string;
  is_resolved: boolean;
  created_at: string;
  resolved_at?: string | null;
}

export interface FeedbackSubmission {
  patientName: string;
  phone: string;
  rating: number;
  feedbackText: string;
}

// 1. Password Verification Helper
export function validateAdminPassword(inputPassword: string): boolean {
  const savedPassword = localStorage.getItem('al_mannat_admin_pass') || 'admin123';
  return inputPassword === savedPassword;
}

// 2. Custom Password Update Helper
export function updateAdminPassword(newPassword: string): void {
  localStorage.setItem('al_mannat_admin_pass', newPassword);
}

// 3. REAL-TIME SUBMISSION FUNCTION (Yeh form submit hote hi turant save karega)
export async function submitPatientFeedback(input: FeedbackSubmission): Promise<void> {
  const newLead: PatientFeedback = {
    id: Date.now().toString(),
    patient_name: input.patientName || 'Anonymous Patient',
    phone_number: input.phone || 'N/A',
    rating: Number(input.rating) || 1,
    feedback_text: input.feedbackText || '',
    is_resolved: false,
    created_at: new Date().toISOString(),
    resolved_at: null,
  };

  // LocalStorage mein turant save karein taaki dashboard par bina delay ke dikhe
  const localData = localStorage.getItem('al_mannat_feedback_leads');
  const existingLeads: PatientFeedback[] = localData ? JSON.parse(localData) : [];
  const updatedLeads = [newLead, ...existingLeads];
  localStorage.setItem('al_mannat_feedback_leads', JSON.stringify(updatedLeads));

  // Agar Supabase connect hai toh wahan bhi insert karne ki koshish karein
  if (supabase) {
    try {
      await supabase.from('patient_feedback').insert({
        patient_name: newLead.patient_name,
        phone_number: newLead.phone_number,
        rating: newLead.rating,
        feedback_text: newLead.feedback_text,
      });
    } catch {
      // Fallback handled safely via localStorage
    }
  }
}

// 4. REAL-TIME FETCH FUNCTION (Yeh Admin Dashboard ke liye data laayega)
export async function fetchPatientFeedback(password: string): Promise<PatientFeedback[]> {
  if (!validateAdminPassword(password)) {
    throw new AdminAuthError();
  }

  // Pehle LocalStorage se data uthayein
  const localData = localStorage.getItem('al_mannat_feedback_leads');
  let localLeads: PatientFeedback[] = localData ? JSON.parse(localData) : [];

  // Agar Supabase active hai toh cloud se latest data fetch karne ki koshish karein
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('patient_feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const remoteLeads: PatientFeedback[] = data.map((item: any) => ({
          id: item.id?.toString() || Date.now().toString(),
          patient_name: item.patient_name || item.patientName || 'Anonymous',
          phone_number: item.phone_number || item.phone || 'N/A',
          rating: item.rating || 1,
          feedback_text: item.feedback_text || item.feedbackText || '',
          is_resolved: Boolean(item.is_resolved),
          created_at: item.created_at || new Date().toISOString(),
          resolved_at: item.resolved_at || null,
        }));

        // LocalStorage ko bhi sync kar dein
        localStorage.setItem('al_mannat_feedback_leads', JSON.stringify(remoteLeads));
        return remoteLeads;
      }
    } catch {
      // Agar cloud fail ho toh local leads return karega
    }
  }

  // Agar koi bhi lead nahi milti toh default sample lead dikha sakte hain ya empty array
  if (localLeads.length === 0) {
    return [
      {
        id: '1',
        patient_name: 'Example Lead',
        phone_number: '9876543210',
        rating: 2,
        feedback_text: 'Wait time was a bit long near reception.',
        is_resolved: false,
        created_at: new Date().toISOString(),
      },
    ];
  }

  return localLeads;
}

// 5. RESOLVE FUNCTION
export async function resolvePatientFeedback(password: string, id: string): Promise<void> {
  if (!validateAdminPassword(password)) {
    throw new AdminAuthError();
  }

  const leads = await fetchPatientFeedback(password);
  const updated = leads.map((item) =>
    item.id === id ? { ...item, is_resolved: true, resolved_at: new Date().toISOString() } : item
  );
  
  localStorage.setItem('al_mannat_feedback_leads', JSON.stringify(updated));

  if (supabase) {
    try {
      await supabase
        .from('patient_feedback')
        .update({ is_resolved: true, resolved_at: new Date().toISOString() })
        .eq('id', id);
    } catch {
      // Handled in LocalStorage
    }
  }
}