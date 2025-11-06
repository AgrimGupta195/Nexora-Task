# Vibe Commerce - Mock E-Commerce Shopping Cart

A full-stack shopping cart application built for Vibe Commerce screening. This project demonstrates a complete e-commerce flow with product listing, cart management, and checkout functionality.

## 🎥 Demo Video

[![Demo Video](https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

**Or use Loom:**
[Watch Demo Video on Loom](https://www.loom.com/share/YOUR_VIDEO_ID)

> **Note:** Replace `VIDEO_ID` with your actual YouTube video ID, or use the Loom share link. Make sure the video is set to "Unlisted" for YouTube or public for Loom.

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/home-page.png)
*Product grid with add to cart functionality*

### Cart Page
![Cart Page](./screenshots/cart-page.png)
*Shopping cart with quantity controls and order summary*

### Checkout Page
![Checkout Page](./screenshots/checkout-page.png)
*Checkout form with customer information*

### Receipt Modal
![Receipt](./screenshots/receipt-modal.png)
*Order confirmation receipt after successful checkout*

> **Note:** Create a `screenshots/` folder in your project root and add your screenshot images there. Use PNG or JPG format.

## 🚀 Features

- **Product Catalog**: Browse 8 mock products with images, descriptions, and prices
- **Shopping Cart**: Add, remove, and update item quantities
- **Real-time Cart Count**: Cart badge updates automatically in the navbar
- **Checkout Flow**: Complete checkout with customer information and order receipt
- **Database Persistence**: Cart items stored in MongoDB
- **Responsive Design**: Clean, minimal UI inspired by Apple's design language
- **Error Handling**: Comprehensive error handling throughout the application

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **RESTful API** architecture

### Frontend
- **React 19** with **Vite**
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons

## 📁 Project Structure

```
nexora/
├── backend/
│   ├── controllers/
│   │   ├── cartController.js
│   │   └── productController.js
│   ├── models/
│   │   ├── cartSchema.js
│   │   └── productSchema.js
│   ├── routers/
│   │   ├── cartRouters.js
│   │   └── productRouters.js
│   ├── lib/
│   │   └── db.js
│   ├── seedProducts.js
│   ├── index.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProductCard.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── CartPage.jsx
    │   │   └── CheckoutPage.jsx
    │   ├── lib/
    │   │   └── axios.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products (auto-seeds if empty)

### Cart
- `POST /api/cart` - Add item to cart
  ```json
  {
    "productId": "product_id_here",
    "qty": 1
  }
  ```
- `GET /api/cart` - Get cart items and total
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
  Returns: Order receipt with orderId, total, timestamp, and cart items

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
```

4. Seed the database with products:
```bash
npm run seed
```

5. Start the server:
```bash
node index.js
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📝 How to Add Screenshots

1. **Take screenshots** of your application:
   - Home page with products
   - Cart page with items
   - Checkout page
   - Receipt modal

2. **Create a screenshots folder** in your project root:
   ```bash
   mkdir screenshots
   ```

3. **Save your screenshots** with descriptive names:
   - `home-page.png`
   - `cart-page.png`
   - `checkout-page.png`
   - `receipt-modal.png`

4. **The README is already configured** to display them using the paths above.

## 🎬 How to Add Demo Video

### Option 1: YouTube (Recommended)

1. **Record your demo** (1-2 minutes showing all features)
2. **Upload to YouTube** and set visibility to **"Unlisted"**
3. **Get the video ID** from the URL: `https://www.youtube.com/watch?v=VIDEO_ID`
4. **Replace `VIDEO_ID`** in the README with your actual video ID

### Option 2: Loom

1. **Record your demo** using Loom
2. **Get the share link** from Loom
3. **Replace the Loom link** in the README with your actual share URL

### Option 3: Direct Video File

1. **Create a `videos/` folder** in your project root
2. **Upload your video** (MP4 format recommended)
3. **Update the README** to link to the video:
   ```markdown
   [Watch Demo Video](./videos/demo.mp4)
   ```

## ✨ Key Features Implementation

### Database Persistence
- Cart items are stored in MongoDB using session-based tracking
- Cart persists across page refreshes
- Automatic cart cleanup after checkout

### Error Handling
- API error handling with user-friendly messages
- Network error detection
- Form validation on checkout

### Responsive Design
- Mobile-first approach
- Clean, minimal UI
- Smooth animations and transitions

## 🔧 Development

### Backend Scripts
- `npm run seed` - Seed database with mock products

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Notes

- Cart uses session-based storage (cookies) for user identification
- Products are automatically seeded on first API call if database is empty
- All cart operations are persisted in MongoDB
- No authentication required for this mock implementation

## 🎯 Assignment Requirements Checklist

✅ **Backend APIs**
- ✅ GET /api/products - Returns 8 mock products
- ✅ POST /api/cart - Add items with productId and qty
- ✅ DELETE /api/cart/:id - Remove items
- ✅ GET /api/cart - Get cart with total
- ✅ POST /api/checkout - Mock receipt with total and timestamp

✅ **Frontend**
- ✅ Products grid with "Add to Cart" buttons
- ✅ Cart view with items, quantity, total, remove/update buttons
- ✅ Checkout form with name/email, receipt modal
- ✅ Fully responsive design

✅ **Bonus Features**
- ✅ Database persistence (MongoDB)
- ✅ Comprehensive error handling
- ✅ Real-time cart count updates

## 📄 License

This project is created for Vibe Commerce screening assignment.
