FROM node:15
WORKDIR /app
COPY package.json yarn.lock ./
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
RUN yarn
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["yarn", "start"]
