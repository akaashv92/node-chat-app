const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString' , () => {
  it('should not allow non-string values', () =>{
      //var sampleString = '1234';
      var result = isRealString(1234);

      expect(result).toBeFalsy();
  });

  it('should not allow empty spaces', () => {
    var sampleString = '    ';
    var result = isRealString(sampleString);

    expect(result).toBeFalsy();
  });

  it('should allow a string', () => {
    var sampleString = 'akaash';
    var result = isRealString(sampleString);

    expect(result).toBeTruthy();
  });
});
