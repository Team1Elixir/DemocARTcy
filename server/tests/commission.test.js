const app = require('../app.js');
const request = require('supertest');
const { queryInterface } = require('../models').sequelize;
const userData = require('../rawData/dummyUser.json');
const commissionData = require('../rawData/dummyCommission.json');
const { encrypt } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

describe('Commission Router', () => {
    let users = [];
    let commissions = [];

    commissionData.map(commission => {
        commission.createdAt = new Date();
        commission.updatedAt = new Date();

        return commission;
    })

    userData.map(user => {
        user.password = encrypt(user.password);
        user.createdAt = new Date();
        user.updatedAt = new Date();
        return user;
    });

    beforeAll(done => {
        queryInterface.bulkInsert('Users', userData, {
            returning: true
        })
            .then(res => {
                users = res;
                return queryInterface.bulkInsert('Commissions', commissionData, {
                    returning: true
                })
            })
            .then(res => {
                commissions = res;
                done();
            })
            .catch(err => {
                done(err);
            })
    })

    describe('Add new Commission', () => {
        describe('Success', () => {
            test('should return status code 201 along with json with key (id, title, price, sample_img, category', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/commissions')
                    .send({
                        title: "Face Sketch",
                        price: 200000,
                        sample_img: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .expect(res => {
                        let{ commission } = res.body;
                        expect(commission).toHaveProperty('title', 'Face Sketch');
                        expect(commission).toHaveProperty('price', 200000);
                        expect(commission).toHaveProperty('sample_img', 'https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg');
                        expect(commission).toHaveProperty('category', '2D Art');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
        })

        describe('Fail', () => {
            test('should return status 400 because title is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/commissions')
                    .send({
                        title: "",
                        price: 200000,
                        sample_img: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Title is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because price is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/commissions')
                    .send({
                        title: "Face Sketch",
                        price: '',
                        sample_img: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Price is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
            
            test('should return status 400 because price is not a number', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/commissions')
                    .send({
                        title: "Face Sketch",
                        price: '200000x',
                        sample_img: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Price must be a number');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because sample image url is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/commissions')
                    .send({
                        title: "Face Sketch",
                        price: 200000,
                        sample_img: "",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Sample image is required, Invalid Url format');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because sample image url format is invalid', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/commissions')
                    .send({
                        title: "Face Sketch",
                        price: 200000,
                        sample_img: "web com",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Invalid Url format');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because category is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/commissions')
                    .send({
                        title: "Face Sketch",
                        price: 200000,
                        sample_img: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                        category: ""
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Category is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because user doesnt have permission to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: 5,
                    username: user.username
                })
                request(app)
                    .post('/commissions')
                    .send({
                        title: "Face Sketch",
                        price: 200000,
                        sample_img: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('authentication data invalid, please login again');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 401 because user is not logged in', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/commissions')
                    .send({
                        title: "Face Sketch",
                        price: 200000,
                        sample_img: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('please login first');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
        })
    })

    describe('Get all commission', () => {
        describe('Success', () => {
            test('should return status 200 with json contain all data of products', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .get('/commissions')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const { commissions } = res.body;
                        expect(commissions).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({
                                    id: 1,
                                    title: "Doodle Art",
                                    price: 110000,
                                    sample_img: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                                    category: "2D Art",
                                    UserId: 1
                                })
                            ])
                        )
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
        })

        describe('Fail', () => {
            test('should return status 401 because user doesnt have permission to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: 5,
                    username: user.username
                })
                request(app)
                    .get('/commissions')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('authentication data invalid, please login again');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 401 because user is not logged in', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .get('/commissions')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('please login first');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
        })
    })

    describe('Select commission by id', () => {
        describe('Success', () => {
            test('should return status 200 along with json of selected commission', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .get('/commissions/1')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let { commission } = res.body;
                        expect(commission).toHaveProperty('id', 1);
                        expect(commission).toHaveProperty('title', 'Doodle Art');
                        expect(commission).toHaveProperty('price', 110000);
                        expect(commission).toHaveProperty('sample_img', 'https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg');
                        expect(commission).toHaveProperty('category', '2D Art');
                        
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            });
        });

        describe('Fail', () => {
            test('should return status code 404 because no commission is found with selected id', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .get('/commissions/5')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('No commission is found');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });
        });
    });

    describe('Update Commission', () => {
        describe('Success', () => {
            test('should return status 200 with json of updated data', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .put('/commissions/1')
                    .send({
                        title: "Doodle Art",
                        price: 100000,
                        sample_img: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let { commission } = res.body;
                        expect(commission).toHaveProperty('id', 1);
                        expect(commission).toHaveProperty('title', 'Doodle Art');
                        expect(commission).toHaveProperty('price', 100000);
                        expect(commission).toHaveProperty('sample_img', 'https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg');
                        expect(commission).toHaveProperty('category', '2D Art');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })

            });
        })

        describe('Fail', () => {
            test('should return status 400 because title is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .put('/commissions/1')
                    .send({
                        title: "",
                        price: 100000,
                        sample_img: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Title is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because price is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .put('/commissions/1')
                    .send({
                        title: "Doodle Art",
                        price: '',
                        sample_img: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Price is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
            
            test('should return status 400 because price is not a number', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .put('/commissions/1')
                    .send({
                        title: "Doodle Art",
                        price: 'xxmcvi',
                        sample_img: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Price must be a number');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because sample image url is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .put('/commissions/1')
                    .send({
                        title: "Doodle Art",
                        price: 100000,
                        sample_img: "",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Sample image is required, Invalid Url format');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because sample image url format is invalid', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .put('/commissions/1')
                    .send({
                        title: "Doodle Art",
                        price: 100000,
                        sample_img: "doodle jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Invalid Url format');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because category is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .put('/commissions/1')
                    .send({
                        title: "Doodle Art",
                        price: 100000,
                        sample_img: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                        category: ""
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Category is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 404 because no commission is found with selected id', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .put('/commissions/5')
                    .send({
                        title: "Doodle Art",
                        price: 100000,
                        sample_img: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                        category: ""
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Commission not found');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 401 because user is unauthorize to do the action', done=> {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .put('/commissions/2')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('You dont have authority to do this action');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            })

            test('should return status 400 because user doesnt have permission to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: 5,
                    username: user.username
                })
                request(app)
                    .put('/commissions/1')
                    .send({
                        title: "Doodle Art",
                        price: 100000,
                        sample_img: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('authentication data invalid, please login again');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 401 because user is not logged in', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .put('/commissions/1')
                    .send({
                        title: "Doodle Art",
                        price: 100000,
                        sample_img: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('please login first');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
        })
    })

    describe('Delete Commission', () => {
        describe('Success', () => {
            test('should return status 200 with success message', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .delete('/commissions/1')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission).toHaveProperty('message', 'Success delete commission with id 1');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
        })
        
        describe('Fail', () => {
            test('should return status 404 because no commission is found with selected id', done=> {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .delete('/commissions/11')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('Commission not found');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            })

            test('should return status 401 because user is unauthorize to do the action', done=> {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .delete('/commissions/2')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('You dont have authority to do this action');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            })

            test('should return status 400 because user doesnt have permission to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: 5,
                    username: user.username
                })
                request(app)
                    .delete('/commissions/1')
                    .send({
                        title: "Doodle Art",
                        price: 100000,
                        sample_img: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('authentication data invalid, please login again');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 401 because user is not logged in', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .delete('/commissions/1')
                    .send({
                        title: "Doodle Art",
                        price: 100000,
                        sample_img: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                        category: "2D Art"
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('please login first');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
        });
    })

    afterAll(done => {
        queryInterface.bulkDelete('Users')
            .then(() => {
                return queryInterface.bulkDelete('Commissions')
            })
            .then(() => {
                done();
            })
            .catch(err => {
                done(err);
            })
    })
});