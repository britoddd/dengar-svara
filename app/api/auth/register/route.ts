import { NextRequest, NextResponse } from 'next/server'
import { registerSchema, createUser, getUserByEmail } from '@/lib/users'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input using Zod
    const validatedData = registerSchema.parse(body)
    
    // Check if user already exists
    const existingUser = getUserByEmail(validatedData.email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }
    
    // Create new user (in production, hash the password here)
    const newUser = createUser(validatedData)
    
    // Return success response without password
    const { password, ...userWithoutPassword } = newUser
    
    return NextResponse.json(
      { 
        message: 'User created successfully', 
        user: userWithoutPassword 
      },
      { status: 201 }
    )
    
  } catch (error) {
    if (error instanceof Error && 'errors' in error) {
      // Zod validation error
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}