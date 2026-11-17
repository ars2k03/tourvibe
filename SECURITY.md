# Security Policy

## Supported versions

Use the latest `master` / `main` branch for fixes and updates.

## Reporting a vulnerability

If you discover a security issue in TourVibe, please email the maintainer privately instead of opening a public issue.

Do **not** commit real secrets (MongoDB Atlas passwords, JWT secrets, Google OAuth client secrets) to the repository. Use `.env` locally and platform environment variables in production.

## Safe defaults

- Passwords are hashed with `bcryptjs`
- API auth uses JWT with expiration
- Role-based access for User / Admin routes
- Input validation with Zod on the server
