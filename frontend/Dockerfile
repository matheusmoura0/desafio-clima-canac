# frontend/Dockerfile

# MUDAMOS AQUI: De 18 para 20
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]