const app = require('../app.js');
const request = require('supertest');
const { queryInterface } = require('../models').sequelize;
const userData = require('../rawData/dummyUser.json');
const workData = require('../rawData/dummWork.json');
const { encrypt } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

describe('Work Router', () => {
    let users = [];
    let works = [];

    workData.map(work => {
        work.createdAt = new Date();
        work.updatedAt = new Date();

        return work;
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
                return queryInterface.bulkInsert('Works', workData, {
                    returning: true
                })
            })
            .then(res => {
                works = res;
                done();
            })
            .catch(err => {
                done(err);
            })
    })

    describe('Get all portofolio', () => {
        describe('Success', () => {
            test('should status 200 with json containing all portofolio data', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .get('/works')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const { works } = res.body;
                        expect(works).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({
                                    id: 1,
                                    title: "Doodle Art",
                                    image_url: "https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg",
                                    story: "A random doodle art",
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
            });
        });

        describe('Fail', () => {
            test('should return status 400 because user doesnt have permission to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: 5,
                    username: user.username
                })
                request(app)
                    .get('/works')
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
                    .get('/works')
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
    });
    
    describe('Add New Portofolio', () => {
        describe('Success', () => {
            test('should return status code 201 along with json with key (id, title, story, image_url, category', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const newWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: "2D Art"
                }
                request(app)
                    .post('/works')
                    .send(newWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .expect(res => {
                        let{ work } = res.body;
                        expect(work).toHaveProperty('title', 'Face Sketch');
                        expect(work).toHaveProperty('story', 'A simple face sketch using only pencil');
                        expect(work).toHaveProperty('image_url', 'https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg');
                        expect(work).toHaveProperty('category', '2D Art');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
        });

        describe('Fail', () => {
            test('should return status 400 because title is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const newWork = {
                    title: "",
                    story: "A simple face sketch using only pencil",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: "2D Art"
                }
                request(app)
                    .post('/works')
                    .send(newWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('Title is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because story is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const newWork = {
                    title: "Face Sketch",
                    story: "",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: "2D Art"
                }
                request(app)
                    .post('/works')
                    .send(newWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('Story is required');
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
                const newWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: ""
                }
                request(app)
                    .post('/works')
                    .send(newWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('Category is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because image url is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const newWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "",
                    category: "2D Art"
                }
                request(app)
                    .post('/works')
                    .send(newWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toMatch('Image url is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because url format is invalid', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const newWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "cat picture",
                    category: "2D Art"
                }
                request(app)
                    .post('/works')
                    .send(newWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('Invalid url format');
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
                const newWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: "2D Art"
                }
                request(app)
                    .post('/works')
                    .send(newWork)
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
                const newWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: "2D Art"
                }
                request(app)
                    .post('/works')
                    .send(newWork)
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
    });

    describe('Select portofolio by id', () => {
        describe('Success', () => {
            test('should return status 200 with json of selected portofolio', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .get('/works/1')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let { work } = res.body;
                        expect(work).toHaveProperty('id', 1);
                        expect(work).toHaveProperty('title', 'Doodle Art');
                        expect(work).toHaveProperty('story', 'A random doodle art');
                        expect(work).toHaveProperty('image_url', 'https://image.freepik.com/free-vector/cute-monsters-collection-doodle-style_122297-15.jpg');
                        expect(work).toHaveProperty('category', '2D Art');
                        
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });
        });

        describe('Fail', () => {
            test('should return status code 404 because no portofolio is found with selected id', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .get('/works/5')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        let commission = res.body;
                        expect(commission.error).toContain('No portofolio is found');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });
        });
    });

    describe('Update Portofolio', () => {
        describe('Success', () => {
            test('should return status code 200 along with json of updated data', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const updatedWork = {
                    title: "Face Sketch BW",
                    story: "A simple face sketch using only pencil",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: "2D Art"
                }
                request(app)
                    .put('/works/1')
                    .send(updatedWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let{ work } = res.body;
                        expect(work).toHaveProperty('title', 'Face Sketch BW');
                        expect(work).toHaveProperty('story', 'A simple face sketch using only pencil');
                        expect(work).toHaveProperty('image_url', 'https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg');
                        expect(work).toHaveProperty('category', '2D Art');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
        });

        describe('Fail', () => {
            test('should return status 400 because title is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const updatedWork = {
                    title: "",
                    story: "A simple face sketch using only pencil",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: "2D Art"
                }
                request(app)
                    .put('/works/1')
                    .send(updatedWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('Title is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because story is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const updatedWork = {
                    title: "Face Sketch",
                    story: "",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: "2D Art"
                }
                request(app)
                    .put('/works/1')
                    .send(updatedWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('Story is required');
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
                const updatedWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: ""
                }
                request(app)
                    .put('/works/1')
                    .send(updatedWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('Category is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because image url is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const updatedWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "",
                    category: "2D Art"
                }
                request(app)
                    .put('/works/1')
                    .send(updatedWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toMatch('Image url is required');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because url format is invalid', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const updatedWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "cat picture",
                    category: "2D Art"
                }
                request(app)
                    .put('/works/1')
                    .send(updatedWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('Invalid url format');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because user doesnt authorize to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const updatedWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "cat picture",
                    category: "2D Art"
                }
                request(app)
                    .put('/works/2')
                    .send(updatedWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('You dont have authority to do this action');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because work not found', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                const updatedWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "cat picture",
                    category: "2D Art"
                }
                request(app)
                    .put('/works/11')
                    .send(updatedWork)
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('Portofolio not found');
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
                const updatedWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: "2D Art"
                }
                request(app)
                    .put('/works/1')
                    .send(updatedWork)
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
                const updatedWork = {
                    title: "Face Sketch",
                    story: "A simple face sketch using only pencil",
                    image_url: "https://s31531.pcdn.co/wp-content/uploads/2018/05/draw-facial-features_lee-hammond_artists-network_portrait-drawing-demo-2-876x1024.jpg",
                    category: "2D Art"
                }
                request(app)
                    .put('/works/1')
                    .send(updatedWork)
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
    });

    describe('Delete Portofolio', () => {
        describe('Success', () => {
            test('should return status 200 with success message', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .delete('/works/1')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let work = res.body;
                        expect(work).toHaveProperty('message', 'Success delete portofolio with id 1');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })
        });

        describe('Fail', () => {
            test('should return status 400 because user doesnt authorize to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .delete('/works/2')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('You dont have authority to do this action');
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    }) 
            })

            test('should return status 400 because work not found', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .delete('/works/11')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        let work = res.body;
                        expect(work.error).toContain('Portofolio not found');
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
                    .delete('/works/1')
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
                    .delete('/works/1')
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
    });

    afterAll(done => {
        queryInterface.bulkDelete('Users')
            .then(() => {
                return queryInterface.bulkDelete('Works')
            })
            .then(() => {
                done();
            })
            .catch(err => {
                done(err);
            })
    })
});