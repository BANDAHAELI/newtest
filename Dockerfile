FROM node:lts-buster
RUN git clone https://github.com/BANDAHAELI/newtest.git /root/newtest
WORKDIR /root/newtest
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
