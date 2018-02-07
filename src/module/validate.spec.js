var validate = require('./validate');
var modelSetup = require('../test-helpers/model.setup.json');

describe("Model Validator", function() {

    it("should be defined", function() {
        expect(validate).toBeTruthy();
    });

    it("should change the model to obj if it is not", function() {
        var setup = modelSetup['case-1'];
        var model = '';
        var response = validate(model, setup);
        var expectedNeededKeys = ['name', 'lastname'];

        expect(response).toBeTruthy();
        expect(response.valid).toBe(false);
        expect(response.neededKeys).toEqual(expectedNeededKeys);
        expect(response.extraKeys).toEqual([]);
        expect(response.wrongTypeKeys).toEqual([]);
        expect(response.model).toEqual({});
    });

    it("should delete extra obj attributes and clean the model", function() {
        var setup = modelSetup['case-1'];
        var model = {
            name: 'John',
            lastname: 'Doe',
            age: 30
        };
        var expectedModel = Object.assign({}, model);
        delete expectedModel.age;
        var response = validate(model, setup);

        // console.log(response);
        expect(response).toBeTruthy();
        expect(response.valid).toBe(true);
        expect(response.neededKeys).toEqual([]);
        expect(response.extraKeys).toEqual(['age']);
        expect(response.wrongTypeKeys).toEqual([]);
        expect(response.model).toEqual(expectedModel);
    });

    it("should validate given model", function() {
        var setup = modelSetup['case-1'];
        var model = {
            name: 'John',
            lastname: 'Doe',
        };
        var response = validate(model, setup);

        // console.log(response);
        expect(response).toBeTruthy();
        expect(response.valid).toBe(true);
        expect(response.neededKeys).toEqual([]);
        expect(response.extraKeys).toEqual([]);
        expect(response.wrongTypeKeys).toEqual([]);
        expect(response.model).toEqual(model);
    });

    describe("response", function() {
        it("should be false when attribute is not given and its required", function() {
            var setup = modelSetup['case-2'];
            var model = {
                name: 'John',
                // lastname: 'Doe',
            };
            var response = validate(model, setup);

            // console.log(response);
            expect(response).toBeTruthy();
            expect(response.valid).toBe(false);
            expect(response.neededKeys).not.toEqual([]);
            expect(response.extraKeys).toEqual([]);
            expect(response.wrongTypeKeys).toEqual([]);
            expect(response.model).toEqual(model);
        });

        it("should be true when attribute is not given and its not required", function() {
            var setup = modelSetup['case-2'];
            setup.keys.lastname.required = false;
            var model = {
                name: 'John',
                // lastname: 'Doe',
            };
            var response = validate(model, setup);

            // console.log(response);
            expect(response).toBeTruthy();
            expect(response.valid).toBe(true);
            expect(response.neededKeys).not.toEqual([]);
            expect(response.extraKeys).toEqual([]);
            expect(response.wrongTypeKeys).toEqual([]);
            expect(response.model).toEqual(model);
        });

        it("should be false when attribute type doesn't match the config type", function() {
            var setup = modelSetup['case-2'];
            var model = {
                name: 'John',
                lastname: 2,
            };
            var response = validate(model, setup);

            // console.log(response);
            expect(response).toBeTruthy();
            expect(response.valid).toBe(false);
            expect(response.neededKeys).toEqual([]);
            expect(response.extraKeys).toEqual([]);
            expect(response.wrongTypeKeys).not.toEqual([]);
            expect(response.model).toEqual(model);
        });

        it("should be true when fillWithDefaults flag is true and attribute is wrong type", function() {
            var setup = modelSetup['case-3'];
            var model = {
                name: 'John',
                lastname: 2,
            };
            var expectedModel = Object.assign({}, model);
            expectedModel.lastname = setup.keys.lastname.default;
            var response = validate(model, setup);

            // console.log(response);
            expect(response).toBeTruthy();
            expect(response.valid).toBe(true);
            expect(response.neededKeys).toEqual([]);
            expect(response.extraKeys).toEqual([]);
            expect(response.wrongTypeKeys).toEqual([]);
            expect(response.model).toEqual(expectedModel);
        });

        it("should be true when fillWithDefaults flag is true and attribute is not given", function() {
            var setup = modelSetup['case-3'];
            var model = {
                name: 'John',
                // lastname: 'Doe',
            };
            var expectedModel = Object.assign({}, model);
            expectedModel.lastname = setup.keys.lastname.default;
            var response = validate(model, setup);

            // console.log(response);
            expect(response).toBeTruthy();
            expect(response.valid).toBe(true);
            expect(response.neededKeys).not.toEqual([]);
            expect(response.extraKeys).toEqual([]);
            expect(response.wrongTypeKeys).toEqual([]);
            expect(response.model).toEqual(expectedModel);
        });
    });

});
