FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

# Copy package.json and package-lock.json
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node package.json ./

# Install dependencies
RUN yarn install

# Copy TypeScript files
COPY --chown=node:node . .

RUN yarn build

# Expose the port your app will run on
EXPOSE 3000

USER node

# Command to run your application
CMD ["yarn", "preview"]