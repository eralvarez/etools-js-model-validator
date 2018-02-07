function validate(model, validationSetup) {

    var modelSetup = validationSetup;

    var response = {
        valid: true,
        neededKeys: [],
        extraKeys: [],
        wrongTypeKeys: [],
        model: {}
    };

    if (typeof model !== 'object') {
        model = {};
    }

    var validKeys = Object.keys(modelSetup.keys);
    var keysToValidate = Object.keys(model);

    for (var i = 0; i < validKeys.length; i++) {
        var currentKey = validKeys[i];

        // the key is set into the provided model?
        if (model[currentKey] !== undefined) {
            // do we have the correct var type?
            if (typeof model[currentKey] !== modelSetup.keys[currentKey].type) {
                if (modelSetup.fillWithDefaults) {
                    model[currentKey] = modelSetup.keys[currentKey].default;
                } else {
                    response.wrongTypeKeys.push(currentKey);
                    response.valid = false;
                }
            }
        } else {
            // is this key required?
            response.neededKeys.push(currentKey);
            if (modelSetup.keys[currentKey].required) {
                if (modelSetup.fillWithDefaults) {
                    model[currentKey] = modelSetup.keys[currentKey].default;
                } else {
                    response.valid = false;
                }
            }
        }
    }

    for (let i = 0; i < keysToValidate.length; i++) {
        var currentKey = keysToValidate[i];

        // remove unnecesary keys
        if (!modelSetup.keys[currentKey]) {
            response.extraKeys.push(currentKey);
            delete model[currentKey];
        }
    }

    response.model = model;

    return response;
}

module.exports = validate;
