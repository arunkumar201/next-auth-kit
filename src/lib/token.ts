import crypto from 'crypto'
import { db } from './db';
import { getTwoFactorTokenByEmail } from '@/helper/two-factor-token';
import { getVerificationTokenByEmail } from '@/helper/verification-token';
import { v4 as uuidv4 } from 'uuid';
/**
 * Generates a verification token for a given email address.
 * @param email - The email address for which the verification token needs to be generated.
 * @returns A Promise that resolves to an object containing the details of the newly created verification token.
 */
export const generateVerificationToken = async (email: string): Promise<{ id: string, email: string, token: string, expires_at: Date }> => {
  const token = uuidv4();
  const expirationTime = new Date(Date.now() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires_at: expirationTime
    }
  });

  return verificationToken;
};


export const generateTokenForResetPassport = async (email:string) => {
  const token = uuidv4();
  const expirationTime = new Date(Date.now() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.forgotPasswordToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }

  const verificationToken = await db.forgotPasswordToken.create({
    data: {
      email,
      token,
      expires_at: expirationTime
    }
  });

  return verificationToken;
}


export const generateTwoFactorToken = async(email:string) => {
  const token = crypto.randomInt(100_000,1_000_000).toString();
  
  const expirationTime = new Date(Date.now() + 4 * 60 * 1000); //4min

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }
  const twoFactorToken = db.twoFactorToken.create({
    data: {
      email,
      token,
      expires_at: expirationTime
    }
  })
  return twoFactorToken;
}
