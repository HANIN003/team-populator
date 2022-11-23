const Manager = require('../lib/Manager');

test('creates an Manager object', () => {
    const manager = new Manager('Nate', 1, 'nathan.hanisch@gmail.com', 555-5555);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});


test('gets role of employee', () => {
    const manager = new Manager('Nate', 1, 'nathan.hanisch86@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
}); 