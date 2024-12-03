## Description

### News Grid

<p>An agreggation of news api from three different news sources built with React and Typescript</p>
<li>NewsAPI: This is a comprehensive API that allows developers to access articles from
more than 70,000 news sources, including major newspapers, magazines, and blogs.
The API provides access to articles in various languages and categories, and it supports
search and filtering </li>
<li>New York Times: This API allows developers to access articles from The New York
Times, one of the most respected news sources in the world. The API provides access
to articles in various categories and supports search and filtering
</li>
<li>The Guardian: This API allows developers to access articles from The Guardian
newspaper, one of the most respected news sources in the world. The API provides
access to articles in various categories and supports search and filtering.
</li>

## Prerequisites

<li>Docker</li>
<li>Docker Compose</li>
<li>News API Key</li>
<li>Newyork Times API Key</li>
<li>The Guardian API Key</li>

## Getting Started

1. Clone this repository:

```bash
$ git clone https://github.com/YhomiAce/news-grid
```

2. Navigate to the project directory:

```bash
$ cd news-grid
```

3. Create .env from .env.example and fill in the necessary api keys:

```bash
$ cp .env.example .env
```

4. Build the Docker images and start the container:

```bash
$ docker-compose up -d --build
```

5. Preview on your browser:

<a href=http://localhost:3000>http://localhost:3000</a>
