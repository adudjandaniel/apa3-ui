FROM nginx:alpine as app-build

WORKDIR /app
COPY . .
RUN apk add --update nodejs npm
RUN npm ci && npm run build -- --prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=app-build /app/dist/apa3-ui //usr/share/nginx/html
EXPOSE 80 443