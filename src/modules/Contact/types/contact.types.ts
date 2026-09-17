export interface ContactFormData {
  companyName: string;
  phone: string;
  email: string;
  requirement: string;
}

export interface ContactFormErrors {
  companyName?: string;
  phone?: string;
  email?: string;
  requirement?: string;
}
