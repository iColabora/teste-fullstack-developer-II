FROM node:14-alpine
WORKDIR /app
COPY . .
RUN npm rebuild node-sass
RUN npm install
RUN npm run build
RUN npm prune --production # Remove dev dependencies
ENV HOST=0.0.0.0
EXPOSE 5000
CMD [ "npm", "start" ]