var jsonConfig = require('./validation.setup.json');
var validate = require('../src/index');

var personObj = {
    name: 'John',
    lastname: 'Wick',
    age: 55,
    job: 'driver'
};

var validationResponse = validate(personObj, jsonConfig);
if (validationResponse.valid) {
    console.log('Yeah, the object it\'s valid');
} else {
    console.log('Ohh snap, the object isn\'t valid');
}

console.log('Object: ', validationResponse.model);

if (validationResponse.extraKeys.length > 0) {
    console.log('Extra keys: ', validationResponse.extraKeys.join(', '));
}

if (validationResponse.neededKeys.length > 0) {
    console.log('Needed keys: ', validationResponse.neededKeys.join(', '));
}

if (validationResponse.wrongTypeKeys.length > 0) {
    console.log('Wrong type keys: ', validationResponse.wrongTypeKeys.join(', '));
}
