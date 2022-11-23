const Engineer = require('../lib/Engineer');


test('creates an Engineer object', () => {
    const engineer = new Engineer('Nate', 1, 'nathan.hanisch86@gmail.com', 'HANIN003');
    
    expect(engineer.github) .toEqual(expect.any(String));
});


test('gets engineer github value', () => {
    const engineer = new Engineer('Nate', 1, 'nathan.hanisch86@gmail.com', 'HANIN003');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});


test('gets role of employee', () => {
    const engineer = new Engineer('Nate', 1, 'nathan.hanisch86@gmail.com', 'HANIN003');

    expect(engineer.getRole()).toEqual("Engineer");
});