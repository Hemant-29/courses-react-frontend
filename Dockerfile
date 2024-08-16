# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application for production
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Expose the port on which the application will run
EXPOSE 8080

# Command to run the application
CMD ["serve", "-s", "dist"]
