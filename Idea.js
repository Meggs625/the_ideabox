class Idea {
    constructor(title, body) {
        this.id = Date.now();
        this.title = title;
        this.body = body;
        this.star = false;
    }

    saveToStorage() {
        localStorage.setItem('data', JSON.stringify(ideaList));
    }

    deleteFromStorage(id) {
        var key = JSON.stringify(this.id);
        localStorage.remove(key);
    }

    updateIdea() {}
}