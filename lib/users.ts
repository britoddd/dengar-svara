import { z } from "zod"
import { query } from "./database"
import { hashPassword } from "./password"

// Database user schema (matches PostgreSQL table)
export const dbUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().min(1),
  password_hash: z.string(),
  created_at: z.date(),
  updated_at: z.date()
})

// API user schema (for responses, without password)
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().min(1),
  created_at: z.date(),
  updated_at: z.date()
})

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required")
})

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

export type DbUser = z.infer<typeof dbUserSchema>
export type User = z.infer<typeof userSchema>

/**
 * Get user by email (includes password hash for authentication)
 */
export const getUserByEmail = async (email: string): Promise<DbUser | null> => {
  try {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )
    
    if (result.rows.length === 0) {
      return null
    }
    
    return dbUserSchema.parse(result.rows[0])
  } catch (error) {
    console.error('Error fetching user by email:', error)
    throw new Error('Failed to fetch user')
  }
}

/**
 * Get user by ID (without password hash)
 */
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const result = await query(
      'SELECT id, email, name, created_at, updated_at FROM users WHERE id = $1',
      [id]
    )
    
    if (result.rows.length === 0) {
      return null
    }
    
    return userSchema.parse(result.rows[0])
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    throw new Error('Failed to fetch user')
  }
}

/**
 * Create a new user
 */
export const createUser = async (userData: {
  name: string
  email: string
  password: string
}): Promise<User> => {
  try {
    // Hash the password
    const passwordHash = await hashPassword(userData.password)
    
    const result = await query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name, created_at, updated_at',
      [userData.name, userData.email, passwordHash]
    )
    
    return userSchema.parse(result.rows[0])
  } catch (error: any) {
    console.error('Error creating user:', error)
    
    // Handle unique constraint violation (duplicate email)
    if (error.code === '23505') {
      throw new Error('Email already exists')
    }
    
    throw new Error('Failed to create user')
  }
}

/**
 * Check if email already exists
 */
export const emailExists = async (email: string): Promise<boolean> => {
  try {
    const result = await query(
      'SELECT 1 FROM users WHERE email = $1',
      [email]
    )
    
    return result.rows.length > 0
  } catch (error) {
    console.error('Error checking email existence:', error)
    throw new Error('Failed to check email')
  }
}