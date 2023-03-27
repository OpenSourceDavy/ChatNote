# AI-Playground :rocket:

Welcome to the `AI-Playground`, an interactive web application that leverages the power of OpenAI's API, including `ChatGPT`, `DALL-E`, and `Text-Davinci`. This project is built using `Next.js` and `TypeScript` for the front end, and `Spring Boot` with `MongoDB` for the back end. `RabbitMQ`, `Redis`, `Clash` and other tech stacks are applied for flexibility.


<p float="left">
<img src="https://user-images.githubusercontent.com/113314216/228029335-7a13e736-9066-4c72-9f23-1f3555b61d17.png" alt="your_image_description" width="400"/>
<img src="https://user-images.githubusercontent.com/113314216/228029440-383f1372-2b6c-49cf-9925-06ad33170d8e.png" alt="your_image_description" width="400"/>
<!-- ![de132040c5aab0c7d208c0f729c1c30](https://user-images.githubusercontent.com/113314216/228029440-383f1372-2b6c-49cf-9925-06ad33170d8e.png=250x150 ) -->
</p>

## View Live Demo:
http://chatnote.live

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

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
