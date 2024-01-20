import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a verification email to the specified email address.
 * 
 * @param email - The email address to send the verification email to.
 * @param token - The verification token.
 * @param url - The base URL for the verification link.
 * @returns A Promise that resolves when the email is sent successfully, or rejects with an error if there was a problem sending the email.
 */
export const sendVerificationEmail = async (email: string, token: string, url: string): Promise<{error:string} | void> => {
    const link = `${url}/auth/new-verification?token=${token}`;
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Please, Confirm Your Email",
            html: `<p>Click the link below to verify your email</p><p><a href="${link}">Verify</a></p>`
        });
    } catch (error) {
		console.log(`Error while sending verification email: ${error}`);
		return {error:"Something went wrong"}
    }
};

export const sendVerificationEmailForResetPassword =async (email: string, token: string, url: string): Promise<{error:string} | void> => {
    
const link = `${url}/auth/new-password?token=${token}`;
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Please, Confirm Your Email",
            html: `<p>Click the link below to Reset the Password </p><p><a href="${link}">Verify</a></p>`
        });
    } catch (error) {
		console.log(`Error while sending verification email: ${error}`);
		return {error:"Something went wrong"}
    }
    
}

export const send2FATokenEmail = async (email:string,token:string) => {
    
    await resend.emails.send({
         from: process.env.MAIL || "onboarding@resend.dev",
         to: email,
        subject: "Two Factor Code",
         html: `<p>Your Two Factor Code ${token}</p>`
    })
}
