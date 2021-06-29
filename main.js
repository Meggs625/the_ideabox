// global variables

const titleInput = document.getElementById('title-input');
const bodyInput = document.getElementById('body-input');
const buttonSave = document.getElementById('save-btn');
const titleOutput = document.querySelector('h3');
const cardDisplay = document.getElementById('card-display');
const ideaInput = document.getElementById('inputs');
const favoriteDisplay = document.getElementById('show-starred');
const searchBar = document.getElementById('search-bar');

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
favoriteDisplay.addEventListener('click', renderFavoritedIdeas);
searchBar.addEventListener('input', searchIdeas);

// Functions
function retrieveLocalStorage() {
    ideaList = JSON.parse(localStorage.getItem('data'));
    if (ideaList) {
        ideaList.forEach(element => new Idea(element.id, element.title, element.body, element.star))
        renderIdeas(ideaList);
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
    renderIdeas(ideaList);
    ß
}


function renderIdeas(ideas) {
    let favorites = ideas.filter(element => element.star === true);
    let nonFavorites = ideas.filter(element => element.star === false);

    cardDisplay.innerHTML = ''
    favorites.forEach(element => cardDisplay.innerHTML +=

        `<article class="idea-box">
    <header>
      <img src="./assets/star-active.svg" class="star" alt="star" id="${element.id}">
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
    nonFavorites.forEach(element => cardDisplay.innerHTML +=
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

function renderFavoritedIdeas() {
    let favorites = ideaList.filter(element => element.star === true);
    switch (favoriteDisplay.innerHTML) {
        case 'Show Starred Ideas':
            cardDisplay.innerHTML = ''
            favorites.forEach(element => cardDisplay.innerHTML +=

                `<article class="idea-box">
    <header>
      <img src="./assets/star-active.svg" class="star" alt="star" id="${element.id}">
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
            favoriteDisplay.innerText = 'Show All Ideas';
            break;
        default:
            favoriteDisplay.innerText = 'Show Starred Ideas';
            renderIdeas(ideaList);


    }
}


function deleteIdea(event) {
    if (event.target.className === 'delete-icon') {
        event.target.closest('article').remove();
        let deletedIdea = identifyCurrentIdea(event);
        deletedIdea.deleteFromStorage();
    }
}


function favoriteIdea(event) {
    let newFavIdea = identifyCurrentIdea(event);
    if (event.target.className === 'star') {
        newFavIdea.updateFavorite();
        event.target.src = './assets/star-active.svg';
        event.target.classList.add('active');
    } else if (event.target.className === 'star active') {
        newFavIdea.undoFavorite();
        event.target.src = './assets/star.svg';
        event.target.classList.remove('active');
    }
}

function identifyCurrentIdea(event) {
    let numId = Number(event.target.id);
    let findIdea = ideaList.find(element => element.id === numId);
    let currentIdea = new Idea(findIdea.id, findIdea.title, findIdea.body, findIdea.star);
    return currentIdea;
}

function searchIdeas() {
    let searchedValue = searchBar.value.toLowerCase();
    let searchedIdeas = ideaList.filter(element => (element.body.toLowerCase().includes(searchedValue) || element.title.toLowerCase().includes(searchedValue)))
    renderIdeas(searchedIdeas);

}