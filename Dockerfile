FROM nginx:alpine as app-build

WORKDIR /app
COPY . .
RUN apk add --update nodejs npm
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=app-build /app/dist/apa3-ui //usr/share/nginx/html
EXPOSE 80