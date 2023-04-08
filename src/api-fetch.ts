/*
Using the Github REST Api v3 or Github Api v4 with GraphQL build the following
functionalities using the programming language and technologies of your choice:

1. Given an organization return the number of repositories.
2. Given an organization return the biggest repository (in bytes).
3. Return the number of organizations that are currently on Github.

You are free to use any technology that you may think is convenient to solve this problem.
You should include a brief documentation on how to use or test your solution.
Don't forget to showcase what you do best.

*/

//Size of each page of repos to fetch from the API. Default is 30
const pageSize = 100;

/**
 * @param {HTMLFormElement} element - Form to get organization from
 * @returns {string} Response with the number of public repos in the organization
 * 
 */
export async function getNumberOfOrgRepos(element: HTMLFormElement): Promise<string> {
    const form = new FormData(element);
    const org = form.get('organization') as string;
    if (!org) {
      return 'Please enter an organization';
    }
    const response = await fetch(`https://api.github.com/orgs/${org}`);
    const data = await response.json();
    return `The number of public repos is ${data.public_repos}`;
}


/**
 * @returns {number} Number of organizations in Github
 * 
 */
export async function getNumberOfOrganizations(): Promise<number> {
    const response = await fetch(`https://api.github.com/search/users?q=type:org`);
    const data = await response.json();
    return data.total_count;
}


// Interface for the repo object returned by the API to make it easier to read
interface Repo {
  name: string;
  size: number;
}

/**
 * @param {HTMLFormElement} formElement - Form to get organization from
 * @returns {string} Response with the name and size of the biggest repo
 * 
 */
export async function getBiggestRepo(formElement: HTMLFormElement): Promise<string> {
  const form = new FormData(formElement);
  const org = form.get('organization') as string;
  if (!org) {
    return 'Please enter an organization';
  }
  let page = 1;
  let allRepos: Repo[] = [];
  let done = false;

  while (!done) {
    // 5 Requests made in parallel
    const requests = Array.from({ length: 5 }, (_, i) =>
      fetch(`https://api.github.com/orgs/${org}/repos?per_page=${pageSize}&page=${page + i}`)
    );
    const responses = await Promise.all(requests);
    done = true;
    for (const response of responses) {
      // Check for errors in each response
      if (!response.ok) {
        throw new Error(`Error fetching repos: ${response.statusText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Unexpected data format');
      }
      allRepos = allRepos.concat(data);
      if (data.length === 100) {
        done = false;
      }
      page++;
    }
  }
  // Sorting the array of repos by size in descending order
  allRepos.sort((a, b) => b.size - a.size);
  // Converting size from kilobytes to bytes
  return `The biggest repo is ${allRepos[0].name} with a size of ${allRepos[0].size * 1024} bytes`;
}