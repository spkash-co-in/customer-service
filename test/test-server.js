var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Customers Service', () => {
    beforeEach((done) => {
        chai.request(server)
            .delete
            ('/customerclear')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


    // Test the /GET route
    describe('Given that there are no customers in the system', () => {
        var response;
        it('When the client requests a list of customers', (done) => {
            chai.request(server)
                .get('/customer')
                .end((err, res) => {
                    response = res;
                    done();
                });
        });
        it('Then the response is a empty list', (done) => {
            response.should.have.status(200);
            response.body.customers.should.be.a('array');
            response.body.customers.length.should.be.eql(0);
            done();
        });
    });

    // Test the /POST route
    describe('As a client I can add a customer to the system', () => {
        var response;
        it('When the client adds a customer', (done) => {
            let customer = {
                name: "J.R.R. Tolkien",
                dob: "01/01/1984",
                gender: "Male"
            }
            chai.request(server)
                .post('/customer')
                .send(customer)
                .end((err, res) => {
                    response = res;
                    done();
                });
        });
        it('Then the system should add a customer successfully!', (done) => {
            response.should.have.status(200);
            done();
        });
        it('And the response should indicate success and status', (done) => {
            response.body.should.be.a('object');
            response.body.should.have.property('success');
            response.body.success.should.be.eql(1);
            done();
        });
        it('And the response should indicate a non-null id of the customer', (done) => {
            response.body.should.have.property('id');
            response.body.id.isNotNull;
            done();
        });
    });

    // Test the /GET route
    describe('Given the system has one customer with name: "J.R.R. Tolkien", dob: "01/01/1984", gender: "Male"', () => {
        var response;
        beforeEach((done) => {
            let customer = {
                name: "J.R.R. Tolkien",
                dob: "01/01/1984",
                gender: "Male"
            };
            chai.request(server)
                .post('/customer')
                .send(customer)
                .end((err, res) => {
                    done();
                });
        });
        it('When the client requests a list of customers', (done) => {
            chai.request(server)
                .get('/customer')
                .end((err, res) => {
                    response = res;
                    done();
                });
        });
        it('Then the response is a non-empty list with size 1', (done) => {
            response.should.have.status(200);
            response.body.customers.should.be.a('array');
            response.body.customers.length.should.be.eql(1);
            done();
        });
        it('And the customer should have attributes id, name, dob, gender', (done) => {
            response.body.customers[0].should.have.property('id');
            response.body.customers[0].should.have.property('name');
            response.body.customers[0].should.have.property('dob');
            response.body.customers[0].should.have.property('gender');
            done();
        });
        it('And the customer should have non-null values for attributes id, name, dob, gender', (done) => {
            response.body.customers[0].id.isNotNull;
            response.body.customers[0].name.isNotNull;
            response.body.customers[0].dob.isNotNull;
            response.body.customers[0].gender.isNotNull;
            done();
        });
        it('And the customer will have name: "J.R.R. Tolkien", dob: "01/01/1984", gender: "Male"', (done) => {
            response.body.customers[0].name.should.be.eql('J.R.R. Tolkien');
            response.body.customers[0].dob.should.be.eql('01/01/1984');
            response.body.customers[0].gender.should.be.eql('Male');
            done();
        });
    });

    // Test the /GET/{id} route
    describe('Given the system has one customer with name: "J.R.R. Tolkien", dob: "01/01/1984", gender: "Male"', () => {
        var response;
        var customerId;
        beforeEach((done) => {
            let customer = {
                name: "J.R.R. Tolkien",
                dob: "01/01/1984",
                gender: "Male"
            };
            chai.request(server)
                .post('/customer')
                .send(customer)
                .end((err, res) => {
                    customerId = res.body.id;
                    done();
                });
        });
        it('When the client requests a customer by providing an id', (done) => {
            chai.request(server)
                .get('/customer/' + customerId)
                .end((err, res) => {
                    response = res;
                    done();
                });
        });
        it('Then the response is a non-empty customer object', (done) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            done();
        });
        it('And the customer should have attributes id, name, dob, gender', (done) => {
            response.body.should.have.property('id');
            response.body.should.have.property('name');
            response.body.should.have.property('dob');
            response.body.should.have.property('gender');
            done();
        });
        it('And the customer should have non-null values for attributes id, name, dob, gender', (done) => {
            response.body.id.isNotNull;
            response.body.name.isNotNull;
            response.body.dob.isNotNull;
            response.body.gender.isNotNull;
            done();
        });
        it('And the customer will have name: "J.R.R. Tolkien", dob: "01/01/1984", gender: "Male"', (done) => {
            response.body.name.should.be.eql('J.R.R. Tolkien');
            response.body.dob.should.be.eql('01/01/1984');
            response.body.gender.should.be.eql('Male');
            done();
        });
    });

    // Test the /GET/{id} route
    describe('Customer Service will allow to delete a customer', () => {
        var response;
        var customerId;
        beforeEach((done) => {
            let customer = {
                name: "J.R.R. Tolkien",
                dob: "01/01/1984",
                gender: "Male"
            };
            chai.request(server)
                .post('/customer')
                .send(customer)
                .end((err, res) => {
                    customerId = res.body.id;
                    done();
                });
        });
        it('When the client deletes the customer by id', (done) => {
            chai.request(server)
                .delete('/customer/' + customerId)
                .end((err, res) => {
                    response = res;
                    //console.log(response);
                    done();
                });
        });
        it('Then the system should delete a customer successfully!', (done) => {
            response.should.have.status(200);
            done();
        });
        it('And the response should indicate success and status and a subsequent request for list of customers should have an empty list response', (done) => {
            response.body.should.be.a('object');
            response.body.should.have.property('success');
            response.body.should.have.property('description');
            response.body.success.should.be.eql(1);
            chai.request(server)
                .get('/customer')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.customers.should.be.a('array');
                    res.body.customers.length.should.be.eql(0);
                });

            done();
        });
    });
});
