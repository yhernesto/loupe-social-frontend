# ============================
# Building stage
# ============================
FROM node:16.13.2-alpine3.14 as build-stage

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --no-save

COPY . .

RUN npm run build

# ============================
# Run stage
# ============================
FROM nginx:1.21.6-alpine as production-stage

RUN mkdir /app

COPY --from=build-stage /app/dist /app

COPY nginx.conf /etc/nginx/nginx.conf