const app = require("../app");
const request = require("supertest");
const { encrypt } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const userData = require('../rawData//dummyUser.json');
const stripe = require('stripe')(process.env.STRIPE_KEY);

describe('Payment Router', () => {
    let tokenId = '';
    let users = [];
    const amount = 120000; //dummy payment amount

    userData.map(user => {
        user.password = encrypt(user.password);
        user.createdAt = new Date();
        user.updatedAt = new Date();
        return user;
    });

    beforeAll( done => {
        stripe.tokens.create({
            card: {
                number: '4242424242424242',
                exp_month: 6,
                exp_year: 2021,
                cvc: '314',
            },
        },
        function(err, token) {
            if(err) {
                done(err);
            } else if (token) {
                tokenId = token.id;

                queryInterface.bulkInsert('Users', userData, { returning: true })
                    .then(res => {
                        users = res;
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            }
        })
    })

    describe('Success', () => {
        test('should reeturn status 200 with success message', done => {
            let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/payment')
                    .send({
                        id: 1,
                        token: {
                            id: tokenId
                        },
                        amount
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const payment = res.body;
                        expect(payment).toHaveProperty('success', `Successfully made a payment transaction with amount of ${amount}`)
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
        });
    });

    describe('Fail', () => {
        test('should return status code 400 because token is invalid', done => {
            let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/payment')
                    .send({
                        id: 1,
                        token: {
                            id: 'tok_dummy'
                        },
                        amount
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const payment = res.body;
                        expect(payment.error).toContain('No such token: tok_dummy')
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
        });
    })

    afterAll(() => {
        queryInterface.bulkDelete('Users');
    })
});