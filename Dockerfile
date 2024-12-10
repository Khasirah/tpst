FROM node:22-alpine
LABEL authors="haris"
WORKDIR tpst
COPY dist dist
RUN npm i -g serve
EXPOSE 5544
CMD ["serve", "-s", "dist"]