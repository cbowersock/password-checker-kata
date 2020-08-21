const assert = require('assert');
const pw = require('./passwordChecker.js');

describe('password', function() {
    it('tests zero character password returns 6', function () {
        assert.equal(pw.strongPasswordChecker(''), 6);
    })
    it('tests single character password returns 5', function () {
        assert.equal(pw.strongPasswordChecker('a'), 5);
    })
    it('tests two character password returns 4', function () {
        assert.equal(pw.strongPasswordChecker('aA'), 4);
    })
    it('tests three character password returns 3', function () {
        assert.equal(pw.strongPasswordChecker('abc'), 3);
    })
    it('tests four character password returns 2', function () {
        assert.equal(pw.strongPasswordChecker('ab3D'), 2);
    })
    it('tests five of same character password returns 2', function () {
        assert.equal(pw.strongPasswordChecker('aaaaa'), 2);
    })
    it('tests five character password that satisfies other requirements returns 1', function () {
        assert.equal(pw.strongPasswordChecker('abc3D'), 1);
    })
    it('tests five character password that is also missing one special character returns 1', function () {
        assert.equal(pw.strongPasswordChecker('abcdD'), 1);
    })
    it('tests six character password that meets requirements returns 0', function () {
        assert.equal(pw.strongPasswordChecker('abcdD3'), 0);
    })
    it('tests ten character password that meets requirements returns 0', function () {
        assert.equal(pw.strongPasswordChecker('abcdD356yn'), 0);
    })
    it('tests twenty character password that meets requirements returns 0', function () {
        assert.equal(pw.strongPasswordChecker('abcdD356ynabcdD356yn'), 0);
    })
    it('tests six of same character password returns 2', function () {
        assert.equal(pw.strongPasswordChecker('aaaaaa'), 2);
    })
    it('tests ten of same character password returns 3', function () {
        assert.equal(pw.strongPasswordChecker('aaaaaaaaaa'), 3);
    })
    it('tests twenty of same character password returns 6', function () {
        assert.equal(pw.strongPasswordChecker('aaaaaaaaaaaaaaaaaaaa'), 6);
    })
    it('tests 6 of non alphanumeric character password returns 3', function () {
        assert.equal(pw.strongPasswordChecker('@#$  %'), 3);
    })
    it('tests single multiple of 3 with one uppercase within required length returns 1', function () {
        assert.equal(pw.strongPasswordChecker('abAbababababababaaa'), 1);
    })
    it('tests password within required length of all same character type returns 2', function () {
        assert.equal(pw.strongPasswordChecker('abcabcabcabc'), 2);
    })
    it('tests password length 21 of all same character returns 7', function () {
        assert.equal(pw.strongPasswordChecker('111111111111111111111'), 7);
    })
    it('tests good password over 20 returns number of chars over 20', function () {
        assert.equal(pw.strongPasswordChecker('abcdD356ynabcdD356ynabcdD356ynabcdD356yn'), 20);
    })
    it('tests password length 40 with good passward starting at char 21 returns 20', function () {
        assert.equal(pw.strongPasswordChecker('11111111111111111111abcdD356ynabcdD356yn'), 20);
    })
    it('tests this long thing returns 32', function () {
        assert.equal(pw.strongPasswordChecker('11111111111111356ynabcdD35111111abcdD356ynabcdD356yn'), 32);
    })
    it('tests this other long thing returns 14', function () {
        assert.equal(pw.strongPasswordChecker('fauhdfaoudfhafudhsufosfuhsfihaos3'), 14);
    })
    it('tests single multiple of 3 in 21 length password returns 3', function () {
        assert.equal(pw.strongPasswordChecker('abababababababababaaa'), 3);
    })
});