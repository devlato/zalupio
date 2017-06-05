# Pull base image
FROM node:0.12.7

# Install Aglio
RUN npm install -g zalupio@latest


ENTRYPOINT ["zalupio"]
