# MedTracker Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.6+

### Step 1: Start Backend (Terminal 1)
```bash
cd backend
mvn spring-boot:run
```
✅ Backend running on http://localhost:8080

### Step 2: Start Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend running on http://localhost:5173

### Step 3: Use the App
1. Open http://localhost:5173
2. Click "Register" and create an account
3. Add family members (e.g., Father, Mother, Son)
4. Click "View Medicines" for any family member
5. Add medicines and manage inventory

## 📱 User Journey

```
Login/Register → Family Members → Select Member → Medicines Dashboard
```

### Example: Adding Medicine for Father
1. Register as "john_doe"
2. Add family member: "Father" (age 55)
3. Click "View Medicines" for Father
4. Click "+ Add Medicine"
5. Enter: Aspirin, 10 tabs/strip, 50 stock, 2 daily dose
6. Manage inventory, place orders, etc.

## 🔑 Key Features

### Multi-User Support
- Each user has their own account
- Separate medicine inventory per family member
- Secure login system

### Family Member Management
- Add unlimited family members
- Track relationship (Father, Mother, Son, etc.)
- Delete members when needed

### Medicine Tracking (Per Family Member)
- Track stock levels
- Calculate days remaining
- Suggest order quantities
- Place orders
- AI chat assistant
- Export to PDF

## 🧪 Test Data

### Create Test User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "test123",
    "name": "Test User",
    "email": "test@example.com"
  }'
```

### Add Family Member
```bash
curl -X POST http://localhost:8080/api/family-members \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "name": "Father",
    "age": 55,
    "relationship": "Father"
  }'
```

### Add Medicine
```bash
curl -X POST http://localhost:8080/api/medicines \
  -H "Content-Type: application/json" \
  -d '{
    "familyMemberId": 1,
    "name": "Aspirin",
    "dosagePerDay": 2,
    "tabletsPerStrip": 10,
    "currentStock": 50
  }'
```

## 🐛 Troubleshooting

### Backend won't start
- Check Java version: `java -version` (need 17+)
- Check port 8080 is free: `lsof -i :8080`
- Run: `mvn clean install` first

### Frontend won't start
- Check Node version: `node -v` (need 18+)
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

### Can't login
- Check backend is running on port 8080
- Check browser console for errors
- Try registering a new user first

### Medicines not showing
- Make sure you selected a family member
- Check backend logs for errors
- Verify familyMemberId is set

## 📚 Documentation

- **API_DOCUMENTATION.md** - Complete API reference
- **DEPLOYMENT.md** - Google Cloud deployment guide
- **IMPLEMENTATION_SUMMARY.md** - Technical details

## 🎯 What's Next?

### For Development
1. Add password hashing (BCrypt)
2. Implement JWT authentication
3. Add user profile editing
4. Add password reset
5. Add email notifications

### For Production
1. Set up Cloud SQL database
2. Deploy to Google Cloud Run
3. Configure custom domain
4. Set up SSL/HTTPS
5. Add monitoring and logging

## 💡 Tips

- Use Chrome DevTools to inspect API calls
- Check backend console for detailed logs
- Each family member has independent medicine inventory
- You can switch between family members anytime
- All data persists in H2 database (./data/meddb)

## 🆘 Need Help?

1. Check the logs in backend console
2. Check browser console for frontend errors
3. Review API_DOCUMENTATION.md for endpoint details
4. Verify all dependencies are installed
5. Make sure both backend and frontend are running

## 🎉 Success Checklist

- [ ] Backend running on port 8080
- [ ] Frontend running on port 5173
- [ ] Can register new user
- [ ] Can add family member
- [ ] Can select family member
- [ ] Can add medicine
- [ ] Can place order
- [ ] Can export PDF

Once all checked, you're ready to deploy! 🚀
