FROM node:18-alpine As development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn*.lock ./
RUN rm -rf node_modules && yarn
COPY --chown=node:node . .
USER node

# BUILD FOR PRODUCTION

FROM node:18-alpine As build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn*.lock ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN yarn build
ENV NODE_ENV production
RUN rm -rf node_modules && yarn --production && yarn cache clean --force
USER node
# FINAL IMAGE COPY
FROM node:18-alpine As production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/*.env ./
COPY --chown=node:node --from=build /usr/src/app/prisma ./
COPY --chown=node:node --from=build /usr/src/app/package.json ./
# RUN yarn global add dotenv-cli
RUN yarn prisma generate
EXPOSE 5412
ENV environment="dev"
ENV build=release:${environment}
RUN ls
CMD [`yarn ${build}`]