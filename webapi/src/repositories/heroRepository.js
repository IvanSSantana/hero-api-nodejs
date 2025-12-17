const { readFile, writeFile } = require('fs/promises');

class HeroRepository {
    constructor({ file }) {
        this.file = file;   
    };
    
    async _currentFileContent() {
        return JSON.parse(await readFile(this.file));
    };

    async find(itemId) {
        if(!itemId) return db;

        const db = await this._currentFileContent();

        return db.find(({ id }) => itemId === id);
    };

    async create(data) {
        const db = await this._currentFileContent();
        db.push(data);

        await writeFile(this.file, JSON.stringify(db));

        return data.id;
    };

    async delete(itemId) {
        if(!itemId) throw new Error("O Id deve ser especificado para a deleção.");
        
        const db = await this._currentFileContent();

        const updated_db = await db.filter(({ id }) => itemId !== id);

        await writeFile(this.file, JSON.stringify(updated_db));
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