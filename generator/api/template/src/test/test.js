import 'babel-polyfill';

import assert from 'assert';
import GitHubUser from '../lib/GitHubUser';

describe('tests', function() {

  // This is an auto-generated sample test to demo testing async functions
  it('should fetch GitHub user details for "subfuzion"', async () => {
    let login = 'subfuzion';
    let user = await GitHubUser.fetchDetails(login);
    assert(user);
    assert.equal(user.login, login);
    assert.equal(user.name, 'Tony Pujals');
    assert.equal(user.blog, 'https://twitter.com/subfuzion');
  });

});
