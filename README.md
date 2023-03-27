# AI-Playground :rocket:

Welcome to the AI-Playground, an interactive web application that leverages the power of OpenAI's API, including ChatGPT, DALL-E, and Text-Davinci. This project is built using Next.js and TypeScript for the front end, and Spring Boot with MongoDB for the back end.

![AI-Playground Screenshot](./assets/screenshot.png)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)

## Features

- :speech_balloon: **ChatGPT**: Experience the AI-powered language model that can generate human-like text based on given input.
- :art: **DALL-E**: Generate creative and unique images from textual descriptions using the DALL-E model.
- :book: **Text-Davinci**: Use the power of Text-Davinci for complex tasks like content generation, semantic search, and more.
- :zap: **Next.js & TypeScript**: A blazing-fast, modern front-end built using Next.js and TypeScript for excellent user experience.
- :rocket: **Spring Boot & MongoDB**: A robust and scalable back end with Spring Boot and MongoDB for efficient data storage and retrieval.

## Prerequisites

Before you can run the project, make sure you have the following installed:

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Java (v11 or higher)
- MongoDB (v4.4 or higher)

Additionally, you'll need an OpenAI API key for using the ChatGPT, DALL-E, and Text-Davinci services.

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:

git clone https://github.com/OpenSourceDavy/ChatNote.git
cd ai-playground

2. Install the front-end dependencies:

cd frontend
npm install

3. Set up the environment variables for the front end:

cp .env.example .env.local


Now, open the .env.local file and fill in your OpenAI API key:

NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here


Install the back-end dependencies:

cd ../backend
./mvnw clean install

Set up the environment variables for the back end:
Create a new file called application.properties inside the src/main/resources folder and add the following content:

spring.data.mongodb.uri=mongodb://localhost:27017/aiplayground
openai.api.key=your_openai_api_key_here

## Usage
To run the project, follow these steps:

Start the back end:

cd backend
./mvnw spring-boot:run

Start the front end:

cd frontend
npm run dev
Now, you can access the AI-Playground at http://localhost:3000.
