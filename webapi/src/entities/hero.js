class Hero {
    constructor({ name, age, powers }) {
        this.id = Math.floor(Math.random() * 100) + Date.now()
        this.name = name
        this.age = age
        this.powers = powers
    };

    isValid() {
        const propertyNames = Object.getOwnPropertyNames(this);
        const amountInvalid = propertyNames
            .map(property => (!!this[property]) ? null : `${property} is missing!`)
            .filter(item => !!item);

        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        }
    };
}

module.exports = Hero

/* 
Tests
const hero = new Hero({ name: "Super Sam", age: 1000, powers: ["Time is money!"]});
const hero2 = new Hero({ name: "Super Jorge", powers: ["Brazilian"]});

console.log('valid: ', hero.isValid());
console.log(hero);

console.log()

console.log('valid: ', hero2.isValid());
console.log(hero2);
 */