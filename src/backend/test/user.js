process.env.NODE_ENV = "test";


const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();


let index = require("../index");


chai.use(chaiHttp);


describe(
    'Creating and logging in',
    () =>
    {
        beforeEach(
            (done) =>
            {

            });

        describe(
            '/PUT user',
            () =>
            {
                it(
                    'it should create a user',
                    (done) =>
                    {
                        let user = {email: "test@test.com", name: "J.R.R. Tolkien", dob: 1954, password: "test"};

                        chai.request(index)
                            .put('/user/create')
                            .send(user)
                            .end(
                                (err, res) =>
                                {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('message').eql('User created successfully');
                                    done();
                                });
                    });
            });
    });
