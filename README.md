# D Grand Jewellery — Startup eCommerce Platform

Production-ready full-stack foundation for **D Grand Jewellery**, a premium fashion jewellery brand for Indian customers.

> **Important:** Fashion Jewellery – Not Real Gold.

## Stack

- **Frontend:** React + Vite + TypeScript + Tailwind utility classes
- **Backend:** Node.js + Express (`/server`)
- **Database:** MongoDB (Mongoose)
- **Media:** Cloudinary (configured in backend)
- **Payments:** Razorpay order creation flow
- **Auth:** OTP-based login API (extensible with SMS provider)

## Key Features

### Storefront
- Home, Collections, Shop, Product Detail, Contact, About
- Product filters by category/price/sort + search
- Product image gallery with zoom + multi-angle thumbnails
- Trending and collection-focused UI in white/gold premium palette
- Trust messaging (COD, quality check, returns)

### Commerce
- Cart management and quantity controls
- Checkout page with:
  - UPI
  - Cards
  - Net Banking
  - Cash on Delivery
- Pincode check UI
- GST-ready order summary/invoice number support on backend

### Customer account
- OTP login interface
- Order history module
- Wishlist + address management section

### Platform pages
- Shipping Policy
- Return Policy
- Privacy Policy

### Admin support
- Product CRUD API
- Inventory fields in product schema
- Order management API
- Coupon management API

## Run Frontend

```bash
npm install
npm run dev
```

## Run Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### Example backend env (`server/.env.example`)

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/dgrand
JWT_SECRET=replace-with-strong-secret
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## SEO
- Meta title/description/keywords per page through `components/Seo.tsx`
- Semantic routing and crawl-friendly content blocks
- Performance-first lightweight assets and lazy loading where applicable
