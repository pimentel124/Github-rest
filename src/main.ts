import './style.css'
import { setupCounter } from './counter'
import {listOrgRepositories, getBiggestRepo, getNumberOfOrganizations} from './api-fetch'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="get-repo-num">
      <form id="post"> 
        <label for="organization">Organization</label>
        <input type="text" id="organization" name="organization" />
      </form>
      <button id="get-repo-num" type="button">Get repository count</button>
    </div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

const inputElement = document.getElementById('organization');
const inputValue = inputElement.value;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
listOrgRepositories(document.querySelector<HTMLFormElement>('#post')!);



console.log(getNumberOfOrganizations())