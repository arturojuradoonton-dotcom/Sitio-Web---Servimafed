export interface ContactFormData {
  companyName: string;
  phone: string;
  email: string;
  requirement: string;
  website?: string;
}

export interface ContactFormErrors {
  companyName?: string;
  phone?: string;
  email?: string;
  requirement?: string;
}
