
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
 * @param {HTMLFormElement} element - Form to get organization from
 * @returns {string} Response with the name and size of the biggest repo
 * 
 */
export async function getBiggestRepo(element: HTMLFormElement): Promise<string> {
  const form = new FormData(element);
  const org = form.get('organization') as string;
  if (!org) {
    //make a toast
    return 'Please enter an organization';
  }
  let page = 1;
  let allRepos: any[] = [];

  // Retrieve all pages of the organization's repositories
  while (true) {
    const response = await fetch(`https://api.github.com/orgs/${org}/repos?per_page=100&page=${page}`);
    if (!response.ok) {
      throw new Error(`Error fetching repos: ${response.statusText}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Unexpected data format');
    }
    allRepos = allRepos.concat(data);
    if (data.length < 100) {
      break;
    }
    page++;
  }

  // Find the biggest repository
  const biggest = allRepos.sort((a: { size: number }, b: { size: number }) => b.size - a.size)[0];
  return `The biggest repo is ${biggest.name} with a size of ${biggest.size} bytes`;
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

