# Turistito — Product Requirements Document (PRD)

## 1. Overview

**Product Name:** Turistito  
**Tagline:** Your AI-powered tour guide, anywhere in the world.

Turistito allows users to upload a photo of a place and receive an immersive, narrated explanation as if a professional tour guide were describing it. The narration is generated using AI and delivered via audio.

---

## 2. Goals

### Primary Goals
- Enable users to upload images and receive contextual, engaging narrations.
- Provide a seamless, fast, and delightful user experience.
- Monetize via subscription or usage-based billing.

### Secondary Goals
- Encourage repeat usage through saved history and personalization.
- Build a scalable architecture for future features (e.g., video, AR).

---

## 3. Target Users

- Travelers exploring new places
- Students learning about geography/history
- Curious users discovering landmarks from photos
- Content creators and social media users

---

## 4. Core Features

### 4.1 Image-to-Narration Flow
- Upload image (mobile + desktop)
- AI analyzes image (landmark/place detection)
- Generate text narration (OpenAI)
- Convert narration to audio (ElevenLabs)
- Play audio in-app

### 4.2 User Accounts
- Email/password + OAuth (Supabase Auth)
- User profile management
- Usage tracking

### 4.3 Dashboard
- View previous uploads
- Replay narrations
- Manage subscription
- Track usage (credits or requests)

### 4.4 Payments
- Subscription tiers or pay-per-use
- Stripe integration
- Usage limits based on plan

### 4.5 Notifications & Email
- Welcome emails
- Usage alerts
- Billing notifications (Loops)

---

## 5. Core Pages

### 5.1 Landing Page
**Purpose:** Convert visitors into users

**Sections:**
- Hero (value proposition + CTA)
- How it works (3-step explanation)
- Demo preview (optional)
- Pricing
- Testimonials (future)
- Footer

**Primary CTA:** "Try it now"

---

### 5.2 Auth Page
**Purpose:** User authentication

**Features:**
- Sign up / login
- OAuth options (Google, etc.)
- Password reset
- Email verification

---

### 5.3 Dashboard (Protected)
**Purpose:** Main user hub

**Features:**
- Upload new image
- View history of narrations
- Play audio
- Delete entries
- View usage limits
- Manage subscription

---

### 5.4 Guide Tour Page
**Purpose:** Core experience

**Flow:**
1. Upload image
2. Show loading/processing state
3. Display generated narration text
4. Auto-play audio narration
5. Option to replay/download/share

**States:**
- Idle
- Uploading
- Processing
- Completed
- Error

---

## 6. User Flow

1. User lands on website
2. Clicks "Try it now"
3. Signs up / logs in
4. Redirected to Dashboard
5. Uploads image
6. Navigates to Guide Tour page
7. Receives narration + audio
8. Result saved in Dashboard history

---

## 7. Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS (recommended)
- Vercel (deployment)

### Backend / Infra
- Supabase (DB, Auth, Storage)
- Vercel Functions / Edge Functions

### AI & Media
- OpenAI (image understanding + text generation)
- ElevenLabs (text-to-speech)

### Payments
- Stripe (subscriptions, billing)

### Communication
- Loops (email notifications)

---

## 8. Data Model (High-Level)

### Users
- id
- email
- created_at
- subscription_status

### Uploads
- id
- user_id
- image_url
- created_at

### Narrations
- id
- upload_id
- text
- audio_url
- created_at

### Usage
- user_id
- requests_count
- plan_limit

---

## 9. API Endpoints (Suggested)

### POST /api/upload
- Upload image
- Store in Supabase Storage

### POST /api/generate
- Input: image_url
- Output: narration text + audio URL

### GET /api/history
- Fetch user narrations

### POST /api/stripe/webhook
- Handle billing events

---

## 10. Non-Functional Requirements

- Fast response time (<10s for narration)
- Mobile-first UX
- Secure authentication
- Scalable architecture
- Error handling and retries

---

## 11. MVP Scope

### Included
- Image upload
- AI narration generation
- Audio playback
- Authentication
- Basic dashboard
- Stripe payments (basic tier)

### Not Included (Future)
- Social sharing
- Multi-language support
- Voice customization
- AR features
- Community content

---

## 12. Success Metrics

- Conversion rate (landing → signup)
- Activation rate (signup → first narration)
- Retention (weekly active users)
- Average narrations per user
- Revenue (MRR)

---

## 13. Risks & Considerations

- Image recognition accuracy
- Latency from AI services
- Cost of API usage (OpenAI + ElevenLabs)
- Abuse/spam uploads
- Audio quality consistency

---

## 14. Future Enhancements

- Multi-language narrations
- Personalized guide styles (funny, formal, etc.)
- Video narration
- Offline mode
- Mobile app

---

## 15. Open Questions

- Free tier limits?
- Narration length constraints?
- Should users edit narration text?
- Audio download allowed?
- Storage limits per user?

---

## 16. Timeline (Rough)

- Week 1: Setup + Auth + Landing
- Week 2: Upload + AI pipeline
- Week 3: Audio + Dashboard
- Week 4: Payments + polish + launch

---

## 17. Summary

Turistito is a simple but powerful AI product that transforms images into engaging narrated experiences. The MVP focuses on delivering a fast, magical core experience with a clean user flow and monetization built in from day one.