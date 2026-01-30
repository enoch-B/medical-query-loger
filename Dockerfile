FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma
RUN npm install
RUN DATABASE_URL="postgresql://postgres:postgres@postgres:5432/medical_queries" npx prisma generate



# COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]