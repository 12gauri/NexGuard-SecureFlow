FROM node:18 AS build

WORKDIR /app

# Receive the build argument from Jenkins
ARG REACT_APP_RAPID_API_KEY

# Make it available to React during npm run build
ENV REACT_APP_RAPID_API_KEY=$REACT_APP_RAPID_API_KEY

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Fix React Router refresh (404)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
