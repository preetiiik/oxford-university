import nodemailer from 'nodemailer';

export function createEmailSender(env = process.env, createTransport = nodemailer.createTransport) {
  const user = env.GMAIL_USER?.trim();
  const pass = env.GMAIL_APP_PASSWORD?.replace(/\s/g, '');
  const recipient = env.CONTACT_EMAIL_TO?.trim();
  if (!user || !pass || !recipient) return null;
  const transport = createTransport({
    host: 'smtp.gmail.com', port: 465, secure: true,
    auth: { user, pass }, dnsTimeout: 10000, connectionTimeout: 10000,
    greetingTimeout: 10000, socketTimeout: 20000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  return async (entry) => {
    const result = await transport.sendMail({
      from: { name: 'Oxford Institutions', address: user },
      to: recipient, replyTo: entry.email,
      messageId: `<enquiry-${entry.id}@${user.split('@')[1]}>`,
      subject: `Oxford enquiry: ${entry.course}`,
      text: `Reference: ${entry.id}\nName: ${entry.name}\nEmail: ${entry.email}\nPhone: ${entry.phone}\nCourse: ${entry.course}\nDate of birth: ${entry.date_of_birth || 'Not provided'}\nDocument: ${entry.document_name || 'None'}\n\n${entry.message}`,
    });
    if (!result.accepted?.length || result.rejected?.length) throw new Error('Gmail did not accept the notification recipient');
  };
}
