import { NextRequest, NextResponse } from 'next/server'
import { registerSchema, createUser, emailExists } from '@/lib/users'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input using Zod
    const validatedData = registerSchema.parse(body)
    
    // Check if user already exists
    const userExists = await emailExists(validatedData.email)
    if (userExists) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }
    
    // Create new user (password will be hashed automatically)
    const newUser = await createUser(validatedData)
    
    return NextResponse.json(
      { 
        message: 'User created successfully', 
        user: newUser 
      },
      { status: 201 }
    )
    
  } catch (error: any) {
    console.error('Registration error:', error)
    
    if (error.message === 'Email already exists') {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }
    
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