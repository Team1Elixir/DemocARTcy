const app = require('../app.js');
const request = require('supertest');
const { queryInterface } = require('../models').sequelize;
const userData = require('../rawData/dummyUser.json');
const commissionData = require('../rawData/dummyCommission.json');
const projectData = require('../rawData/dummyProject.json');
const { encrypt } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

describe('Progress Router', () => {
    let users = [];
    let commissions = [];
    let projects = [];

    commissionData.map(commission => {
        commission.createdAt = new Date();
        commission.updatedAt = new Date();

        return commission;
    });

    projectData.map(project => {
        project.createdAt = new Date();
        project.updatedAt = new Date();

        return project;
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
                return queryInterface.bulkInsert('Progresses', projectData, {
                    returning: true
                })
            })
            .then(res => {
                projects = res;
                done();
            })
            .catch(err => {
                done(err);
            })
    })

    describe('Get All Projects', () => {
        describe('Success', () => {
            test('should return status code 200 along with json containing all project data own by logged in user', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .get('/progresses')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const { projects } = res.body;
                        expect(projects[0]).toHaveProperty('id', 2);
                        expect(projects[0]).toHaveProperty('title', '2D Animal Drawing');
                        expect(projects[0]).toHaveProperty('price', 80000);
                        expect(projects[0]).toHaveProperty('status', 'onRequest');
                        expect(projects[0]).toHaveProperty('ClientId', 1);
                        expect(projects[0]).toHaveProperty('ArtistId', 2);
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });
        });

        describe('Fail', () => {
            test('should return status 401 because user doesnt have permission to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: 5,
                    username: user.username
                })
                request(app)
                    .get('/progresses')
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
                    .get('/progresses')
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

    describe('Add new Project', () => {
        describe('Success', () => {
            test('should return status 201 with json containing new project data', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/progresses/2')
                    .send({
                        title: '3D Design using Blender',
                        price: 300000
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .expect(res => {
                        const { progress } = res.body;
                        expect(progress).toHaveProperty('title', '3D Design using Blender');
                        expect(progress).toHaveProperty('price', 300000);
                        expect(progress).toHaveProperty('status', 'onRequest');
                        expect(progress).toHaveProperty('ClientId', 1);
                        expect(progress).toHaveProperty('ArtistId', 2);
                        
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
                request(app)
                    .post('/progresses/2')
                    .send({
                        title: '',
                        price: 300000
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const progress = res.body;
                        expect(progress.error).toContain('Title is required')
                        
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });

            test('should return status 400 because price is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/progresses/2')
                    .send({
                        title: '3D Design using Blender',
                        price: ''
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const progress = res.body;
                        expect(progress.error).toContain('Price is required')
                        
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });

            test('should return status 400 because price is not a number', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/progresses/2')
                    .send({
                        title: '3D Design using Blender',
                        price: 'XXMCVI'
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const progress = res.body;
                        expect(progress.error).toContain('Price must be a number')
                        
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });

            test('should return status 400 because user tried to apply for their own commission', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/progresses/1')
                    .send({
                        title: 'Doodle Art',
                        price: 110000
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const progress = res.body;
                        expect(progress.error).toContain('You cant apply for your own commission')
                        
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });

            test('should return status 401 because user doesnt have permission to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: 5,
                    username: user.username
                })
                request(app)
                    .post('/progresses/2')
                    .send({
                        title: '',
                        price: 300000
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const progress = res.body;
                        expect(progress.error).toContain('authentication data invalid, please login again')
                        
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });

            test('should return status 401 because user is not logged in', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .post('/progresses/2')
                    .send({
                        title: '',
                        price: 300000
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const progress = res.body;
                        expect(progress.error).toContain('please login first')
                        
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });
        });
    });

    describe('Change progress status', () => {
        describe('Success', () => {
            test('should return status code 200 along with json containing updated project data', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .patch('/progresses/2')
                    .send({
                        status: 'Done'
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const { progress } = res.body;
                        expect(progress).toHaveProperty('id', 2);
                        expect(progress).toHaveProperty('title', '2D Animal Drawing');
                        expect(progress).toHaveProperty('price', 80000);
                        expect(progress).toHaveProperty('status', 'Done');
                        expect(progress).toHaveProperty('ClientId', 1);
                        expect(progress).toHaveProperty('ArtistId', 2);
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            })
            
        });

        describe('Fail', () => {
            test('should return status code 400 because status is empty', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .patch('/progresses/2')
                    .send({
                        status: ''
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const progress = res.body;
                        expect(progress.error).toContain('Status is required')
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });

            test('should return status code 400 because no project found with selected id', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .patch('/progresses/4')
                    .send({
                        status: 'Done'
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        const progress = res.body;
                        expect(progress.error).toContain('Project not found')
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });

            test('should return status code 400 because user doesnt have authorithy to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .patch('/progresses/1')
                    .send({
                        status: 'Done'
                    })
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const progress = res.body;
                        expect(progress.error).toContain('You dont have authority to do this action')
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });

            test('should return status 401 because user doesnt have permission to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: 5,
                    username: user.username
                })
                request(app)
                    .patch('/progresses/2')
                    .send({
                        status: 'Done'
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
                    .patch('/progresses/2')
                    .send({
                        status: 'Done'
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
    });

    describe('Delete Project', () => {
        describe('Success', () => {
            test('should status 200 with success message', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .delete('/progresses/2')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const progress = res.body;
                        expect(progress).toHaveProperty('message', 'Success delete project with id 2')
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });
        });

        describe('Fail', () => {
            test('should return status code 400 because user doesnt have authorithy to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: user.id,
                    username: user.username
                })
                request(app)
                    .delete('/progresses/1')
                    .set('Accept', 'application/json')
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const progress = res.body;
                        expect(progress.error).toContain('You dont have authority to do this action')
                    })
                    .end(err => {
                        if(err) done(err);
                        else done();
                    })
            });

            test('should return status 401 because user doesnt have permission to do the action', done => {
                let user = users[0];
                let token = generateToken({
                    id: 5,
                    username: user.username
                })
                request(app)
                    .delete('/progresses/2')
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
                    .delete('/progresses/2')
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
            return queryInterface.bulkDelete('Commissions')
        })
        .then(() => {
            return queryInterface.bulkDelete('Progresses')
        })
        .then(() => {
            done();
        })
        .catch(err => {
            done(err);
        })
    })


});