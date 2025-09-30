#!/usr/bin/env node

/**
 * Database initialization script
 * Run this to create the database tables
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { pool } from '../lib/database.js'

async function initDatabase() {
  try {
    console.log('🔧 Initializing database...')
    
    // Read and execute schema
    const schemaPath = resolve(process.cwd(), 'database', 'schema.sql')
    const schema = readFileSync(schemaPath, 'utf8')
    
    await pool.query(schema)
    
    console.log('✅ Database initialized successfully!')
    console.log('📊 Tables created:')
    console.log('   - users (with indexes and triggers)')
    
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

initDatabase()