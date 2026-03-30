# Use Node.js
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy all your code (index.html, style.css, etc.)
COPY . .

# Hugging Face Spaces always uses port 7860
ENV PORT=7860
EXPOSE 7860

# Start the server
CMD ["node", "server.js"]