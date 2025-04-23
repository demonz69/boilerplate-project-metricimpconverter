const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { assert } = chai;
chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Convert a valid input such as 10L', done => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnUnit, 'gal');
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.match(res.body.string, /^10 liters converts to/);
        done();
      });
  });

  test('Convert invalid input such as 32g', done => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  test('Convert invalid number such as 3/7.2/4kg', done => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  test('Convert invalid number AND unit such as 3/7.2/4kilomegagram', done => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  test('Convert with no number such as kg', done => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });
});
