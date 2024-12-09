FROM node:22-alpine
LABEL authors="haris"
WORKDIR tpst
COPY . .
RUN npm install
RUN npm i -g serve
RUN npm run build
EXPOSE 5544
CMD ["serve", "-s", "dist"]