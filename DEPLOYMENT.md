# Deployment Guide

## 🚀 Vercel Deployment

This project is configured for deployment on Vercel with serverless functions.

### ✅ What's Been Fixed

1. **Updated API function**: Created `api/send-email.ts` with proper TypeScript and Vercel types
2. **Fixed Vercel configuration**: Updated `vercel.json` to use `@vercel/node` runtime
3. **Separated development and production**:
   - **Production**: Uses real Resend API via Vercel serverless function
   - **Development**: Uses mock email service for local testing

### 🔧 Environment Variables for Production

Before deploying, make sure to set these environment variables in your Vercel dashboard:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add: `RESEND_API_KEY` with your actual Resend API key value

### 📋 Deployment Steps

1. **Deploy to Vercel**:

   ```bash
   vercel --prod
   ```

2. **Set environment variables** in Vercel dashboard

3. **Test the deployment** by visiting your live site and testing the contact form

### 🔍 Troubleshooting

#### Common Issues

1. **Function Runtime Error**:

   - ✅ Fixed by using `@vercel/node` runtime
   - ✅ Using TypeScript API function for better compatibility

2. **Missing Environment Variables**:

   - Set `RESEND_API_KEY` in Vercel dashboard
   - Remove hardcoded API key from production

3. **CORS Issues**:
   - ✅ Headers are properly set in the API function
   - Works for both development and production

### 🏠 Local Development

For local development, you have two options:

#### Option 1: Mock Email Service (Recommended for UI development)

```bash
npm run dev:full
```

- Runs on `http://localhost:3001`
- Contact form shows success but doesn't send real emails
- Perfect for testing UI and functionality

#### Option 2: Regular Vite Dev Server (UI only)

```bash
npm run dev
```

- Runs on `http://localhost:3000`
- Contact form will show helpful error message about API not being available

### 📁 File Structure

```
├── api/
│   └── send-email.ts         # Vercel serverless function (TypeScript)
├── server.js                 # Local development server (mock email)
├── vercel.json              # Vercel configuration
└── src/
    └── utils/
        └── emailApi.ts      # Frontend API utility
```

### 🔐 Security Notes

- **Environment Variables**: Never commit API keys to version control
- **CORS**: Properly configured for cross-origin requests
- **Validation**: Server-side validation for all form inputs
- **Error Handling**: Graceful error handling with user-friendly messages

### 📧 Email Configuration

1. **Sender Domain**: Update `from: 'onboarding@resend.dev'` to your verified domain
2. **Recipient**: Currently set to `dylanballard.builds@gmail.com`
3. **Templates**: Professional HTML email with plain text fallback

---

**Ready to deploy!** 🎉 Your website now has full email functionality that works seamlessly on Vercel.
