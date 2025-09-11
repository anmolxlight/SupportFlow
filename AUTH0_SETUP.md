# Auth0 Setup Guide

This guide will help you configure Auth0 authentication for your SupportFlow application.

## Prerequisites

1. An Auth0 account (sign up at [auth0.com](https://auth0.com))
2. Node.js and npm/yarn installed

## Step 1: Create Auth0 Application

1. Go to your [Auth0 Dashboard](https://manage.auth0.com)
2. Click "Applications" in the sidebar
3. Click "Create Application"
4. Choose "Regular Web Application" 
5. Select "Next.js" as the technology
6. Click "Create"

## Step 2: Configure Application Settings

In your Auth0 application settings:

1. **Allowed Callback URLs**: 
   ```
   http://localhost:3000/api/auth/callback
   https://your-domain.com/api/auth/callback
   ```

2. **Allowed Logout URLs**:
   ```
   http://localhost:3000
   https://your-domain.com
   ```

3. **Allowed Web Origins**:
   ```
   http://localhost:3000
   https://your-domain.com
   ```

## Step 3: Configure Environment Variables

1. Copy `.env.local` to your project root if it doesn't exist
2. Update the following variables:

```bash
# Generate a random 32-character secret
AUTH0_SECRET='your-generated-secret-here'

# Your application URLs
AUTH0_BASE_URL='http://localhost:3000'  # Change for production

# From your Auth0 Application settings
AUTH0_ISSUER_BASE_URL='https://your-auth0-domain.auth0.com'
AUTH0_CLIENT_ID='your-client-id'
AUTH0_CLIENT_SECRET='your-client-secret'

# Optional: for API authentication
AUTH0_AUDIENCE='your-api-audience'
AUTH0_SCOPE='openid profile email'
```

## Step 4: Generate AUTH0_SECRET

Run one of these commands to generate a secure secret:

```bash
# Using OpenSSL (recommended)
openssl rand -hex 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using online generator (less secure)
# Visit: https://generate-secret.now.sh/32
```

## Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`
3. Click the "Login" button
4. You should be redirected to Auth0's login page
5. After successful login, you'll be redirected back to your app

## Features Included

✅ **Authentication Flow**: Login/Logout with Auth0  
✅ **Dark Mode**: Smooth theme transitions with Framer Motion  
✅ **Dynamic Charts**: Real-time data visualization with multiple chart types  
✅ **Mobile Responsive**: Optimized knowledge base and dashboard  
✅ **Real-time Updates**: Charts update every 15 seconds  
✅ **Interactive UI**: Smooth animations and transitions  

## Troubleshooting

### Common Issues:

1. **"Invalid Callback URL"**
   - Ensure your callback URLs are correctly configured in Auth0
   - Check that AUTH0_BASE_URL matches your current domain

2. **"Invalid Client"**
   - Verify CLIENT_ID and CLIENT_SECRET are correct
   - Ensure the Auth0 application type is "Regular Web Application"

3. **CORS Errors**
   - Add your domain to "Allowed Web Origins" in Auth0
   - Check that ISSUER_BASE_URL includes https://

4. **Environment Variables Not Loading**
   - Restart your development server after changing .env.local
   - Ensure .env.local is in your project root
   - Verify variable names match exactly (case-sensitive)

## Production Deployment

For production deployment:

1. Update AUTH0_BASE_URL to your production domain
2. Add production URLs to Auth0 application settings
3. Ensure all environment variables are set in your hosting platform
4. Use HTTPS for all URLs in production

## Security Best Practices

- Never commit .env.local to version control
- Regenerate AUTH0_SECRET for production
- Use different Auth0 applications for development and production
- Enable Multi-Factor Authentication in Auth0
- Review Auth0 logs regularly

## Support

If you encounter issues:

1. Check Auth0 logs in your dashboard
2. Review browser console for errors
3. Verify all URLs use HTTPS in production
4. Ensure environment variables are properly set

For more detailed information, visit the [Auth0 Next.js Quickstart](https://auth0.com/docs/quickstart/webapp/nextjs).