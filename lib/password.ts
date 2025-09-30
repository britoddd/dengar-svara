import bcrypt from 'bcrypt'

const SALT_ROUNDS = 12

/**
 * Hash a plain text password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * Verify a plain text password against a hash
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}