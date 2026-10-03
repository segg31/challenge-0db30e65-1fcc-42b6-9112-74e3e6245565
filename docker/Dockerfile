# STUB: Multi-stage Dockerfile para construir y servir la aplicación Angular
# La aplicación Angular se construye en un contenedor con Node.js
# y se sirve con un servidor web en producción.
# TODO: Implementar las etapas de build y serve

FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage de producción con servidor web
FROM nginx:alpine

COPY --from=build /app/dist/angular-architecture-docs/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]