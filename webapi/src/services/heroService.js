class HeroService {
    constructor({ heroRepository }) {
        this.heroRepository = heroRepository;
    };

    async find(itemId) {
        return this.heroRepository.find(itemId);
    };

    async create(data) {
        return this.heroRepository.create(data);
    };

    async delete(itemId) {
        return this.heroRepository.delete(itemId);
    }
}

module.exports = HeroService;