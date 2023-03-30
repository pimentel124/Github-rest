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



const form = document.querySelector<HTMLFormElement>('#post')!;

/*
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const body = getNumberOfOrgRepos(document.querySelector<HTMLFormElement>('#post')!);
  console.log(body);
});
*/

/* When the form is changed, reset both output text*/
form.addEventListener('change', (event) => {
  event.preventDefault();
  const text = document.querySelector<HTMLParagraphElement>('.repo-num')!;
  text.innerHTML = ''; // reset the text in the paragraph
  const text2 = document.querySelector<HTMLParagraphElement>('.biggest-repo')!;
  text2.innerHTML = ''; // reset the text in the paragraph
});


/* When the button is clicked, get the number of repos in the organization*/
const buttonGetRepoNum = document.querySelector<HTMLButtonElement>('#get-repo-num')!;
buttonGetRepoNum.addEventListener('click', async (event) => {
  event.preventDefault();
  const form = document.querySelector<HTMLFormElement>('#post')!;
  const body = await getNumberOfOrgRepos(form);
  const text = document.querySelector<HTMLParagraphElement>('.repo-num')!;
  if (body) {
    text.innerHTML = body;
  } else {
    throw new Error('Get repo num failed');
  }
  console.log(body);
});

/* When the button is clicked, get the biggest repo in the organization*/
const buttonGetBiggestRepo = document.querySelector<HTMLButtonElement>('#get-biggest-repo')!;
buttonGetBiggestRepo.addEventListener('click', async (event) => {
  event.preventDefault();
  const body = await getBiggestRepo(document.querySelector<HTMLFormElement>('#post')!);
  const text = document.querySelector<HTMLParagraphElement>('.biggest-repo')!;
  if (body) {
    text.innerHTML = body;
  } else {
    throw new Error('Get biggest repo failed');
  }
  console.log(body);
});


/* When the button is clicked, get the number of organizations*/
const button = document.querySelector<HTMLButtonElement>('#get-all-orgs')!;
button.addEventListener('click', async (event) => {
  event.preventDefault();
  const numberOfOrganizations = await getNumberOfOrganizations();
  const text = document.querySelector<HTMLParagraphElement>('.org-counter')!;
  text.innerHTML = `The number of organizations is ${numberOfOrganizations}`;
  console.log(numberOfOrganizations);
});

