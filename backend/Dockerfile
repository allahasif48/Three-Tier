# Step 1: Build the Node.js backend
FROM node:16-alpine

WORKDIR /app
COPY index.js ./
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend source code to the container
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Run the backend app
CMD ["node", "index.js"]

