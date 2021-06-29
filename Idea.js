class Idea {
    constructor(id, title, body, star) {
        this.id = id || Date.now();
        this.title = title;
        this.body = body;
        this.star = star || false;
    }

    saveToStorage() {
        localStorage.setItem('data', JSON.stringify(ideaList));
    }

    deleteFromStorage() {
        let parsedIdeas = JSON.parse(localStorage.getItem('data'));
        for (let i = 0; i < parsedIdeas.length; i++) {
            if (parsedIdeas[i].id === this.id) {
                parsedIdeas.splice(i, 1);
            }
        }
        ideaList = parsedIdeas;
        this.saveToStorage(ideaList);
    }


    updateFavorite() {
        for (let i = 0; i < ideaList.length; i++) {
            if (ideaList[i].id === this.id) {
                ideaList[i].star = true;
            }
        }
        this.saveToStorage();

    }
    undoFavorite() {
        for (let i = 0; i < ideaList.length; i++) {
            if (ideaList[i].id === this.id) {
                ideaList[i].star = false;
            }
        }
        this.saveToStorage();
    }

}