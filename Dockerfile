FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration production

FROM nginx:alpine
COPY --from=build dist/fmfrontend/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
