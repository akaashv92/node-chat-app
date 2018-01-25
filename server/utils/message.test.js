var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage()' , () => {
    it('should generate the correct message' , () => {
      var message = generateMessage('Akaash', 'Test Message');

      expect(message.from).toBe('Akaash');
      expect(message.text).toBe('Test Message');
      expect(typeof(message.createdAt)).toBe('number');
    });
});

describe('generateLocationMessage()', () => {
  it('should generate correct location object', () =>{
    var locationUrl = generateLocationMessage('Akaash', 1, 5);

    expect(locationUrl.from).toBe('Akaash');
    expect(locationUrl.url).toBe('https://www.google.com/maps?q=1,5');
    expect(typeof(locationUrl.createdAt)).toBe('number');
  });
});
