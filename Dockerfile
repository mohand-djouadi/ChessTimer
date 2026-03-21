FROM node:22-alpine
RUN npm install -g pnpm expo-cli@latest @expo/ngrok@^4.1.0
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --chown=node:node . .
RUN pnpm install --no-frozen-lockfile
EXPOSE 8081 19000 19001 19002
CMD ["npx", "expo", "start", "--lan"]