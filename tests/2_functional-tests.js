const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Convert valid input 10L', done => {
    chai.request(server)
      .get('/api/convert?input=10L')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initUnit, 'l');
        done();
      });
  });

  test('Invalid input unit', done => {
    chai.request(server)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  test('Invalid number format', done => {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  test('Invalid number and unit', done => {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, res) => {
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  test('No number provided (e.g., kg)', done => {
    chai.request(server)
      .get('/api/convert?input=kg')
      .end((err, res) => {
        assert.equal(res.body.initNum, 1);
        done();
      });
  });
});
