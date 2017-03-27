var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Customers', () => {
        beforeEach((done) => { 
        //Before each test snippet
    });
});

// Test the /GET route
  describe('/GET customer', () => {
      it('it should GET all the customers', (done) => {
        chai.request(server)
            .get('/customer')
            .end((err, res) => {
                res.should.have.status(200);
                //res.status.should.be.equal(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });