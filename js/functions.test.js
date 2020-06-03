const functions = require('./functions');

test('Data fetched should have 5 properties', () => {
    return functions.getData("http://localhost:3000/api/cameras/").then(data => {
        expect(data.length).toBe(5);
    })
});

