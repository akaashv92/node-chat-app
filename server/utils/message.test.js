var expect = require('expect');
var {generateMessage} = require('./message');


describe('generateMessage()' , () => {
    it('should generate the correct message' , () => {
      var message = generateMessage('Akaash', 'Test Message');

      expect(message.from).toBe('Akaash');
      expect(message.text).toBe('Test Message');
      expect(typeof(message.createdAt)).toBe('number');
    });
});
