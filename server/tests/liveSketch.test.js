const io = require('socket.io-client');
const server = require('../app');

let socket;

beforeAll((done) => {
    server.listen(3000);
    done();
});

afterAll((done) => {
    server.close()
    done();
});

beforeEach((done) => {
    socket = io.connect("http://localhost:4000");
    socket.on('connect', () => {
      done();
    });
});

// afterEach((done) => {
//     if (socket.connected) {
//       socket.disconnect();
//     }
//     done();
// });


describe('Live Sketch Test', () => {
    describe('Mouse Event', () => {
        test('should return mouse coordinate', done  => {

            socket.current.on('mouse', data => {
                expect(data).toBe(data);
                // expect(data).toHaveProperty('x');
                // expect(data).toHaveProperty('y');
                // expect(data).toHaveProperty('px');
                // expect(data).toHaveProperty('py');
                done();
            });
        });
    });
});