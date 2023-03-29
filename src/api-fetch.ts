
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

export function listOrgRepositories( organization: string ) {
    return fetch( `https://api.github.com/orgs/${organization}/repos`)
    .then( ( response ) => response.json() )
    .then( ( data ) => data.map( ( repo: { name: any; } ) => repo.name ) );
}

export function getBiggestRepo( organization: string ) {
    return fetch( `https://api.github.com/orgs/${organization}/repos`)
    .then( ( response ) => response.json() )
    .then( ( data ) => data.sort( ( a: { size: number; }, b: { size: number; } ) => b.size - a.size )[0].name );
}

export function getNumberOfOrganizations() {
    return fetch( `https://api.github.com/search/users?q=type%3Aorg`)
    .then( ( response ) => response.json() )
    .then( ( data ) => data.total_count );
}