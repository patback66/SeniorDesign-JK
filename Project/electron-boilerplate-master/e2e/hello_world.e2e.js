import { expect } from 'chai';
import testUtils from './utils';

describe('application launch', function () {

    beforeEach(testUtils.beforeEach);
    afterEach(testUtils.afterEach);

    it('settings button after launch', function () {
        return this.app.client.getText('#settings').then(function (text) {
            expect(text).to.equal('Settings ⚙');
        });
    });
});
