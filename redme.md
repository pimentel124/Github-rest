# Trifork developer test

## Statement

Using the Github REST Api v3 or Github Api v4 with GraphQL build the following
functionalities using the programming language and technologies of your choice:

1. Given an organization return the number of repositories.
2. Given an organization return the biggest repository (in bytes).
3. Return the number of organizations that are currently on Github.
You are free to use any technology that you may think is convenient to solve this problem.
You should include a brief documentation on how to use or test your solution.

## Solution

The solution is built in two modules. The first module is the frontend application and the second module is the backend application. In my case I've used the [Github REST Api v3](https://docs.github.com/en/rest/reference/repos#get-a-repository).

## How to run

The application is hosted on Vercel and can be accessed [here](https://github-rest.vercel.app/).

The project is built using Vite and Typescript. To run the project on your own, you need to have Node.js installed. Then run the following commands:

```bash
npm install
npm run dev
```

## Reference links to test the application

To get the number of repositories for an organization [here](https://github.com/<organization_name>)
To test the size of any public repository you can use the [GitHub Repository Size extension](https://chrome.google.com/webstore/detail/github-repository-size/apnjnioapinblneaedefcnopcjepgkci/) for Chrome. Or you can use the [Github REST Api v3](https://docs.github.com/en/rest/reference/repos#get-a-repository) to get the size of a repository using the following endpoint: `https://api.github.com/repos/<owner>/<repo>`. Note the size presented in the endpoint is in kilobytes.
Get the total number of organizations on Github [here](https://github.com/search?q=type%3Aorg&type=users).
