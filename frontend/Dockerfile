# Step 1: Build the React app
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source code to the container
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the React app using a lightweight web server (nginx)
FROM nginx:alpine

# Copy the build files from the previous stage to the nginx server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port nginx will run on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

