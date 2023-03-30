import './style.css'
import {getNumberOfOrgRepos, getBiggestRepo, getNumberOfOrganizations} from './api-fetch'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="repo-form">
      <form id="post"> 
        <label for="organization">Organization</label>
        <input type="text" id="organization" name="organization" />
      </form>
      <br>
      <button id="get-repo-num" type="button">Get repository count</button>
      <button id="get-biggest-repo" type="button">Get biggest repository</button>
      <div id="repo-num">
        <p class="repo-num"></p>
      </div>
      <div id="biggest-repo">
        <p class="biggest-repo"></p>
      </div>
    </div>
    <div class="card">
      <button id="get-all-orgs" type="button">Get number of orgs</button>
      <div id="counter">
        <p class="org-counter">The number of orgs is 0</p>
      </div>
    </div>
  </div>
`

//Retrieve the String of the form and call the function to get the number of repositories

const form = document.querySelector<HTMLFormElement>('#post')!;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const body = getNumberOfOrgRepos(document.querySelector<HTMLFormElement>('#post')!);
  console.log(body);
});

const buttonGetRepoNum = document.querySelector<HTMLButtonElement>('#get-repo-num')!;
buttonGetRepoNum.addEventListener('click', async (event) => {
  event.preventDefault();
  const body = await getNumberOfOrgRepos(document.querySelector<HTMLFormElement>('#post')!);
  const text = document.querySelector<HTMLParagraphElement>('.repo-num')!;
  text.innerHTML = `The number of public repos is ${body}`;
  console.log(body);
});

//Retrieve the String of the form and call the function to get the biggest repository

const buttonGetBiggestRepo = document.querySelector<HTMLButtonElement>('#get-biggest-repo')!;
buttonGetBiggestRepo.addEventListener('click', async (event) => {
  event.preventDefault();
  const body = await getBiggestRepo(document.querySelector<HTMLFormElement>('#post')!);
  const text = document.querySelector<HTMLParagraphElement>('.biggest-repo')!;
  text.innerHTML = body;
  console.log(body);
});


//Retrieve the number of organizations

const button = document.querySelector<HTMLButtonElement>('#get-all-orgs')!;
button.addEventListener('click', async (event) => {
  event.preventDefault();
  const counter = await getNumberOfOrganizations();
  const text = document.querySelector<HTMLParagraphElement>('.org-counter')!;
  text.innerHTML = `The number of orgs is ${counter}`;
  console.log(counter);
});


//listOrgRepositories(document.querySelector<HTMLFormElement>('#post')!);



//console.log(getNumberOfOrganizations())