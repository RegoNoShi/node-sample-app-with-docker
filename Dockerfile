FROM node:15
WORKDIR /app
COPY package.json yarn.lock ./
ARG NODE_ENV
RUN yarn
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "src/index.js"]
