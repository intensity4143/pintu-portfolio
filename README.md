# Pintu Kumar – Portfolio (Monorepo)

Full-stack portfolio with a private admin CMS.

Live: https://pintu-portfolio-xi.vercel.app/

---

## Structure

```
portfolio/
├── frontend/          ← React + Vite + Tailwind
│   ├── src/
│   ├── public/
│   ├── assets/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── .env.example
│
├── backend/           ← Node.js + Express + MongoDB
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── controllers/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## Local Development

### Backend

```bash
cd backend
cp .env.example .env    # fill in your values
npm install
npm run dev             # starts on :5000
```

### Seed the database (first time only)

```bash
cd backend
npm run seed
```

### Frontend

```bash
cd frontend
cp .env.example .env    # VITE_API_BASE_URL=http://localhost:5000
npm install
npm run dev             # starts on :3000
```

---

## Environment Variables

### `backend/.env`

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio
JWT_SECRET=your_long_random_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=YourStrongPassword123!
CLIENT_URL=http://localhost:3000
NODE_ENV=development
PORT=5000
```

### `frontend/.env`

```
VITE_API_BASE_URL=http://localhost:5000
```

---

## Admin Panel

Visit `http://localhost:3000/admin/login` after seeding.

| Route | Purpose |
|---|---|
| `/admin/login` | Login |
| `/admin` | Dashboard overview |
| `/admin/profile` | Edit profile, about, social links, contact |
| `/admin/projects` | CRUD projects + image upload |
| `/admin/skills` | CRUD skills by category |
| `/admin/experience` | CRUD work experience |
| `/admin/education` | CRUD education |
| `/admin/achievements` | CRUD achievements |
| `/admin/resume` | Upload / replace resume PDF |

---

## Deployment

### Frontend → Vercel

1. Set root directory to `frontend/`
2. Set `VITE_API_BASE_URL=https://your-backend.onrender.com`
3. Build command: `npm run build`
4. Output directory: `dist`

### Backend → Render / Railway

1. Set root directory to `backend/`
2. Set all env vars from `backend/.env.example`
3. Set `CLIENT_URL=https://your-vercel-app.vercel.app`
4. Set `NODE_ENV=production`
5. Start command: `node server.js`

---

## API Endpoints

### Public
```
GET /api/profile
GET /api/projects
GET /api/projects/:id
GET /api/skills
GET /api/experience
GET /api/education
GET /api/achievements
GET /api/resume
```

### Auth
```
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Protected (admin cookie required)
```
PUT    /api/profile
POST   /api/profile/image
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
POST   /api/skills
PUT    /api/skills/:id
DELETE /api/skills/:id
POST   /api/experience
PUT    /api/experience/:id
DELETE /api/experience/:id
POST   /api/education
PUT    /api/education/:id
DELETE /api/education/:id
POST   /api/achievements
PUT    /api/achievements/:id
DELETE /api/achievements/:id
POST   /api/resume
DELETE /api/resume
```
