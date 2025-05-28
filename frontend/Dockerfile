# Etapa 1 - Build da aplicação
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Etapa 2 - Servir com Nginx
FROM nginx:alpine

# Remove a configuração default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos da aplicação para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia uma configuração customizada (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
