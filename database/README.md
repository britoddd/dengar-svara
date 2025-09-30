# Database Setup Guide

## PostgreSQL Setup

### 1. Install PostgreSQL
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- **macOS**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

### 2. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE myapp;

# Create user (optional)
CREATE USER myapp_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE myapp TO myapp_user;

# Exit
\q
```

### 3. Configure Environment Variables
Update `.env.local` with your database credentials:

```bash
POSTGRES_USER=postgres          # or myapp_user
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=myapp
```

### 4. Initialize Database Tables
```bash
# Make sure you're in the project root
cd my-app

# Run the initialization script
node scripts/init-db.js
```

## Database Schema

### Users Table
- `id` - Primary key (auto-increment)
- `email` - Unique email address
- `name` - User's full name
- `password_hash` - Bcrypt hashed password
- `created_at` - Timestamp when user was created
- `updated_at` - Timestamp when user was last updated

## Security Features

- ✅ **Password Hashing**: Uses bcrypt with salt rounds = 12
- ✅ **Unique Constraints**: Email addresses must be unique
- ✅ **SQL Injection Protection**: Uses parameterized queries
- ✅ **Connection Pooling**: Efficient database connection management

## Usage

After setup, your authentication system will:
1. Register users with hashed passwords in PostgreSQL
2. Authenticate users by comparing hashed passwords
3. Manage sessions through NextAuth.js

## Troubleshooting

### Connection Issues
- Check PostgreSQL is running: `sudo service postgresql status`
- Verify connection details in `.env.local`
- Ensure database exists: `psql -U postgres -l`

### Permission Issues
- Grant proper permissions to your database user
- Check PostgreSQL logs for detailed error messages

### Development vs Production
- **Development**: Use PostgreSQL locally
- **Production**: Use managed PostgreSQL (AWS RDS, Heroku Postgres, etc.)