# Etools - Javascript Model Validator

Nodejs tool to validate each key/property of object/model.

## Table Of Contents
- [Quick Start](#quick-start)
- [Arguments](#arguments)
- [Function response](#function-response)
- [NPM Commands](#npm-commands)
- [Status](#status)
- [Contributing](#contributing)

## Quick Start
Follow the next steps to install this module into your nodejs app.

1. Install the NPM module

    ```bash
    npm install --save @etools/js-model-validator
    ```

2. Create a JSON config file `my.config.json`.

    ```json
    {
        "fillWithDefaults": false,
        "keys": {
            "name": {
                "required": true,
                "type": "string",
                "default": ""
            },
                "lastname": {
                "required": false,
                "type": "string",
                "default": ""
            },
            "phone": {
                "required": true,
                "type": "number",
                "default": ""
            }
        }
    }
    ```

3. Add module and config to `your.file.js`.

    ```javascript
    var modelConfig = require('./my.config.json');
    var validate = require('@etools/js-model-validator');
    ```
4. Add object we want to validate and call function.
    ```javascript
    var modelConfig = require('./my.config.json');
    var validate = require('@etools/js-model-validator');
    var personObj = {
        name: 'John',
        lastname: 'Wick',
        age: 55,
        job: 'driver'
    };

    var validationResponse = validate(personObj, modelConfig);
    console.log(validationResponse);
    /* this should log:
    {
        valid: false,
        neededKeys: [ 'phone' ],
        extraKeys: [ 'age', 'job' ],
        wrongTypeKeys: [],
        model: {
            name: 'John',
            lastname: 'Wick'
        }
    }
    */
    ```

## Arguments
This are the arguments you need to pass to the `validate` function.

| Argument      | Position | Var type | Required? | Defaults | Description
|---------------|----------|----------|----|---|------------|
| JS/JSON obj to validate | 1 | `object` | `yes` | `{}` | This is the JSON or model we want to analize/validate |
| Contig object | 2 | `object` | `yes` | none | This is the config obj we will use to validate our JSON or model. |

## Function response
Response object:
```json
{
    "valid": true,
    "neededKeys": [],
    "extraKeys": [],
    "wrongTypeKeys": [],
    "model": {}
}
```

| Property | Var type | Description |
|---|---|---|
| `valid` | `boolean` | Indicates if the model that we passed is either valid or not. |
| `neededKeys` | `array` | List of required keys that where not found in the model/object. |
| `extraKeys` | `array` | List of extra keys found in the model/object. We know that are "extra" because we didn't list them in the config object. |
| `wrongTypeKeys` | `array` | List of keys that had didn't match the variable type as specifies in the config object. |
| `model` | `array` | Cleaned model. |

## NPM Commands
```bash
npm run test    ~ Runs unit tests and code coverage
npm run demo    ~ Runs demo app
```

## Status
- [Project's issue tracker](https://github.com/erick-alvarez/etools-js-model-validator/issues?state=open)
- [Pull requests](https://github.com/erick-alvarez/etools-js-model-validator/pulls)

## Contributing
Thanks for creating this tool even better!, please clone this repo and create a PR.
