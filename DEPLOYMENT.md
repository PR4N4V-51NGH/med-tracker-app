# MedTracker Multi-User Deployment Guide

## Overview
MedTracker now supports multiple users with authentication, family member management, and per-family-member medicine tracking.

## Architecture Changes

### Backend (Spring Boot)
**New Entities:**
- `User` - User accounts with username/password
- `FamilyMember` - Family members linked to users
- `Medicine` - Now linked to family members via `familyMemberId`

**New APIs:**
1. **Authentication** (`/api/auth`)
   - `POST /api/auth/register` - Register new user
   - `POST /api/auth/login` - Login with username/password

2. **Family Members** (`/api/family-members`)
   - `GET /api/family-members/user/{userId}` - Get all family members for a user
   - `POST /api/family-members` - Create family member
   - `PUT /api/family-members/{id}` - Update family member
   - `DELETE /api/family-members/{id}` - Delete family member

3. **Medicines** (`/api/medicines`)
   - `GET /api/medicines?familyMemberId={id}` - Get medicines for a family member
   - All other medicine endpoints remain the same

### Frontend (React)
**New Pages:**
- `Login.jsx` - Login/Register page
- `FamilyMembers.jsx` - Manage family members
- `Medicines.jsx` - View medicines for selected family member

**New Context:**
- `AuthContext` - Manages user authentication and selected family member

## Local Development Setup

### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Google Cloud Deployment

### Option 1: Cloud Run (Recommended for Beginners)

#### Backend Deployment
1. Create `Dockerfile` in backend folder:
```dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

2. Deploy to Cloud Run:
```bash
gcloud run deploy medtracker-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Frontend Deployment
1. Update API URL in frontend code to your backend Cloud Run URL

2. Create `Dockerfile` in frontend folder:
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

3. Deploy to Cloud Run:
```bash
gcloud run deploy medtracker-frontend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Option 2: App Engine

#### Backend (app.yaml)
```yaml
runtime: java17
instance_class: F2
env_variables:
  SPRING_PROFILES_ACTIVE: "prod"
```

Deploy:
```bash
cd backend
gcloud app deploy
```

#### Frontend (app.yaml)
```yaml
runtime: nodejs20
handlers:
  - url: /.*
    static_files: dist/index.html
    upload: dist/index.html
```

Deploy:
```bash
cd frontend
npm run build
gcloud app deploy
```

### Option 3: Compute Engine (Full Control)

1. Create VM instance
2. Install Java 17 and Node.js
3. Clone repository
4. Run backend: `java -jar backend/target/*.jar`
5. Build and serve frontend with Nginx

## Database Configuration

### Development (H2)
Already configured in `application.properties`

### Production (Cloud SQL - PostgreSQL)
1. Create Cloud SQL instance
2. Update `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://CLOUD_SQL_IP:5432/medtracker
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

3. Add PostgreSQL dependency to `pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>
```

## Security Considerations

**Current Implementation:**
- Plain text passwords (for development only)
- No JWT tokens
- CORS enabled for localhost

**Production Recommendations:**
1. Use BCrypt for password hashing
2. Implement JWT authentication
3. Configure proper CORS origins
4. Use HTTPS
5. Add rate limiting
6. Implement session management

## Environment Variables

### Backend
```bash
export GROQ_API_KEY=your_groq_key
export GEMINI_API_KEY=your_gemini_key
export DATABASE_URL=your_db_url
```

### Frontend
```bash
export VITE_API_URL=https://your-backend-url.com
```

## User Flow

1. User registers/logs in
2. User creates family members (Father, Mother, Son, etc.)
3. User selects a family member
4. User manages medicines for that family member
5. Each family member has their own medicine inventory

## API Testing

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123","name":"John Doe","email":"john@example.com"}'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}'
```

### Create Family Member
```bash
curl -X POST http://localhost:8080/api/family-members \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"name":"Father","age":55,"relationship":"Father"}'
```

### Add Medicine for Family Member
```bash
curl -X POST http://localhost:8080/api/medicines \
  -H "Content-Type: application/json" \
  -d '{"familyMemberId":1,"name":"Aspirin","dosagePerDay":2,"tabletsPerStrip":10,"currentStock":50}'
```

## Cost Estimation (Google Cloud)

- **Cloud Run**: ~$5-20/month (with free tier)
- **Cloud SQL**: ~$10-50/month
- **App Engine**: ~$10-30/month
- **Compute Engine**: ~$15-50/month

## Next Steps

1. Test locally
2. Choose deployment option
3. Set up production database
4. Configure environment variables
5. Deploy backend
6. Update frontend API URL
7. Deploy frontend
8. Test production deployment
9. Set up monitoring and logging
10. Implement security enhancements
