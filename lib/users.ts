import { z } from "zod"

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6)
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

export type User = z.infer<typeof userSchema>

// Simple in-memory user store (replace with database in production)
let users: User[] = [
  {
    id: "1",
    email: "test@example.com",
    password: "password123", // In production, this should be hashed
    name: "Test User"
  }
]

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email)
}

export const createUser = (userData: Omit<User, 'id'>): User => {
  const newUser: User = {
    ...userData,
    id: Date.now().toString() // Simple ID generation
  }
  users.push(newUser)
  return newUser
}

export const getAllUsers = (): User[] => {
  return users.map(({ password, ...user }) => ({ ...user, password: '' })) // Don't expose passwords
}