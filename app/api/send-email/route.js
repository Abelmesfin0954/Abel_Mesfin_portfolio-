// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();
    
    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Email content
    const msg = {
      to: process.env.TO_EMAIL || 'your@email.com', // Change to your email
      from: process.env.FROM_EMAIL || 'noreply@example.com', // Change to your verified sender
      subject: `New Message from ${name}: ${subject || 'No Subject'}`,
      text: `You've received a new message from your portfolio website:
      
Name: ${name}
Email: ${email}
Subject: ${subject || 'No Subject'}
Message:
${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Message from Portfolio Website</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            This message was sent from your portfolio website contact form.
          </p>
        </div>
      `,
    };
    
    // Send email
    await sgMail.send(msg);
    
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
}