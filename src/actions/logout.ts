'use server';

import { signOut } from '@/auth';

/**
 * Perform custom logic before logout on the server.
 *
 * @return {Promise<void>} Awaits the signOut function and returns a success message.
 */
export const logout = async (): Promise<void> => {
  // Perform custom logic before logout on the server
  await signOut();
};
