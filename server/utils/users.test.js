const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users  = new Users();
    users.users = [{
      'id' : '1',
      'name' : 'Akaash',
      'room' : 'node'
    }, {
      'id' : '2',
      'name' : 'Jen',
      'room' : 'angular'
    }, {
      'id' : '3',
      'name' : 'Aks',
      'room' : 'React'
    }];
  });

  it('should add new function', () => {
    var users = new Users();
    var user = {'id' : 123 , 'name' : 'akaash', 'room' : 'dota fans'};

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toBe(undefined);
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    var userName = users.getUser('1');
    expect(userName.id).toEqual('1');
  });

  it('should not find a user', () => {
    var userName = users.getUser('112345');
    expect(userName).toEqual(undefined);
  });

  it('should return names for node course', ()=> {
    var userList = users.getUserList('node');

    expect(userList).toEqual(['Akaash']);
  });

  it('should return names for angular course', ()=> {
    var userList = users.getUserList('angular');

    expect(userList).toEqual(['Jen']);
  });
});
