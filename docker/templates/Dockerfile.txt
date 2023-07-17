# Step 0 - build
FROM node:14-alpine AS source

WORKDIR /web-server

COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy sources
COPY . .

# Build project
RUN node ace build --production

# Remove dev dependencies
RUN npm prune --production

# Step 1 - run
FROM node:14-alpine AS build

EXPOSE 8080

WORKDIR /web-server

COPY --from=source /web-server/build .

# Avoid another dependencies installation
COPY --from=source /web-server/node_modules ./node_modules

COPY --from=source /web-server/scripts/start.sh ./start.sh

RUN chmod +x ./start.sh

CMD ['sh', 'start.sh']
