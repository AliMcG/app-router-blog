/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { env } from "~/env";

/**
 * Docs for nodemailer: https://nodemailer.com/
 */
export async function POST(request: NextRequest) {
  const { email, name, message } = await request.json();
  const transport = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
  secure: true,
  port: 465,
    auth: {
      user: env.FORM_EMAIL,
      pass: env.FORM_EMAIL_PASSWORD,
    },
  });
  const emailMessage = `From: ${email}, name: ${name}, message: ${message}`;

  const mailOptions: Mail.Options = {
    from: env.FORM_EMAIL,
    to: env.FORM_EMAIL,
    subject: `Message from ${name} (${email})`,
    text: emailMessage,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
