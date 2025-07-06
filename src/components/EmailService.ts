import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_CONFIG = {
  publicKey: 'ijPH71i8fu1S0uyCC',
  serviceId: 'service_xenon_emain',
  templateId: 'template_g300n0b'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (formData: EmailData): Promise<boolean> => {
  try {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      time: new Date().toLocaleString()
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};