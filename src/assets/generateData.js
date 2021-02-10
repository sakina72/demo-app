var faker = require('faker')

var database = {customers: []};

for(var i = 1; i<=30; i++){
    database.customers.push({
        id: i,
        fname: faker.name.firstName(),
        lname: faker.name.lastName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state()
    });
}

console.log(JSON.stringify(database));