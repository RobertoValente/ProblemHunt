FROM node:20

WORKDIR /app
COPY . .

WORKDIR /app/website
RUN npm install
RUN npm run build-css

WORKDIR /app
ARG WEBSITE_PORT
ENV WEBSITE_PORT=$WEBSITE_PORT
EXPOSE $WEBSITE_PORT
CMD ["node", "start.js"]