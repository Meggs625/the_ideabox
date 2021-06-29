// global variables

const titleInput = document.getElementById('title-input');
const bodyInput = document.getElementById('body-input');
const buttonSave = document.getElementById('save-btn');
const titleOutput = document.querySelector('h3');
const cardDisplay = document.getElementById('card-display');
const ideaInput = document.getElementById('inputs');

var ideaList;

// event Listeners
window.addEventListener('load', retrieveLocalStorage);
buttonSave.addEventListener('click', saveIdea);
ideaInput.addEventListener('input', verifyInput);
cardDisplay.addEventListener('click', function(event) {
    deleteIdea(event)
});
cardDisplay.addEventListener('click', function(event) {
    favoriteIdea(event)
});

// Functions
function retrieveLocalStorage() {
    ideaList = JSON.parse(localStorage.getItem('data'));
    if (ideaList) {
        ideaList.forEach(element => new Idea(element.title, element.body))
        renderIdeas();
    } else {
        ideaList = [];
    }
}

function verifyInput() {
    if (titleInput.value && bodyInput.value) {
        buttonSave.disabled = false;
        buttonSave.classList.remove('inactive');
    } else {
        buttonSave.classList.add('inactive');
        buttonSave.disabled = true;
    }
}

function saveIdea(event) {
    event.preventDefault();
    let newIdea = new Idea(null, titleInput.value, bodyInput.value);
    ideaList.push(newIdea);
    newIdea.saveToStorage();
    renderIdeas();
}

function renderIdeas() {
    cardDisplay.innerHTML = ''
    ideaList.forEach(element => cardDisplay.innerHTML +=
        `<article class="idea-box">
        <header>
          <img src="./assets/star.svg" class="star" alt="star" id="${element.id}">
          <img src="./assets/delete.svg" class="delete-icon" id="${element.id}" alt="delete-icon">
        </header>
        <div class="idea-body">
          <h3>${element.title}</h3>
          <p class="body-text">${element.body}</p>
        </div>
        <footer>
          <img src="./assets/comment.svg" class="add-comment" alt="add-comment">
          <p class="comment">Comment</p>
        </footer>
      </article>`)

    titleInput.value = '';
    bodyInput.value = '';
    verifyInput();
}

function deleteIdea(event) {
    if (event.target.className === 'delete-icon') {
        event.target.closest('article').remove();
        const numId = Number(event.target.id);
        const findIdea = ideaList.find(element => element.id === numId);
        const deletedIdea = new Idea(findIdea.id, findIdea.title, findIdea.body, findIdea.star);
        deletedIdea.deleteFromStorage();
    }
}


function favoriteIdea(event) {
    if (event.target.className === 'star') {
        event.target.src = './assets/star-active.svg';
        event.target.classList.add('active');
    } else if (event.target.className === 'star active') {
        event.target.src = './assets/star.svg';
        event.target.classList.remove('active');
    }
}