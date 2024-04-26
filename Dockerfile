# Stage 1: Base Image
FROM node:18-alpine AS base
WORKDIR /home/node/app

# Stage 2: Install Dependencies
FROM base as dependencies
COPY --chown=node:node package.json package.json
COPY --chown=node:node package-lock.json package-lock.json
RUN npm ci --only=production

# Stage 3: Build Image
FROM dependencies as build
COPY --chown=node:node . .
RUN npm run build

# Stage 4: Production Image
FROM base AS production
COPY --chown=node:node --from=build /home/node/app/node_modules node_modules
COPY --chown=node:node --from=build /home/node/app/dist dist

USER node
EXPOSE 3000
CMD ["node", "./dist/main.js"]