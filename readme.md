# 📘 BookWorm – Personalized Book Tracker & Recommender

A cozy, responsive web app to track your reading journey and discover your next favorite book.

![BookWorm Screenshot](./screenshot.png)

## ✨ Features

- 📚 **Three-Shelf System**: Want to Read, Currently Reading, Read
- ⭐ **Review & Rate Books**
- 🔍 **Smart Recommendations** based on your reading history
- 👥 **Admin Dashboard** for content management
- 🎥 **Book Tutorials** (YouTube embeds)
- 📊 **Reading Stats & Goals** (2026 Challenge!)
- 🔒 **Secure JWT Authentication**

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose)
- **Auth**: JWT + HTTP-only cookies
- **Storage**: Cloudinary
- **Hosting**: Vercel

## 🚀 Live Demo

- **Frontend**: [https://example.app](https://example.app)
- **Backend API**: [https://example.com](https://example.com)

> ✅ Fully authenticated, no public routes.  
> ✅ Mobile-responsive design.  
> ✅ Error handling & loading states.

## 🧪 Environment Variables (Backend)

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_strong_jwt_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NODE_ENV=production
```
## How to install and run
```
cd server
npm install
npm run dev
```