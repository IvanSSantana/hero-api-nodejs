const { readFile, writeFile } = require('fs/promises');

class HeroRepository {
    constructor({ file }) {
        this.file = file;   
    };
    
    async _currentFileContent() {
        return JSON.parse(await readFile(this.file));
    };

    async find(itemId) {
        const db = await this._currentFileContent();
        if(!itemId) return db;

        return db.find(({ id }) => itemId === id);
    };

    async create(data) {
        const db = await this._currentFileContent();
        db.push(data);

        await writeFile(this.file, JSON.stringify(db));

        return data.id;
    }
}

module.exports = HeroRepository;

// Tests
/* const heroRepository = new HeroRepository({
    file: './../../database/data.json'
});

heroRepository.find(1).then(result => console.log(result)).catch(error => console.log(error));
heroRepository.create(
    {
        id: 2,
        name: "Chapolin",
        powers: ["The Best"]
    }
)
.then(console.log)
.catch(error => console.log(error)); */