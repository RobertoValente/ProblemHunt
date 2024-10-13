FROM node:20
WORKDIR /usr/src/code/app
COPY . .
RUN npm install
ARG PORT
ENV PORT $PORT
EXPOSE $PORT
CMD ["node", "start.js"]