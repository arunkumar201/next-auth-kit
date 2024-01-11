import { db } from './db';
import { getVerificationTokenByEmail } from '@/helper/verification-token';
import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4();

	const expirationTime = new Date(new Date().getTime() + 3600 * 1000)
	
	const existingToken = await getVerificationTokenByEmail(email)
	
	if (existingToken) {
		await db.verificationToken.delete({
			where: {
				id: existingToken.id
			}
			
		})
		
		
	}

	  const verificationToken = await db.verificationToken.create({
		data: {
			email,
			token,
			expires_at:expirationTime
		}
	})
  return verificationToken;
};
