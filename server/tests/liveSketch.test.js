const io = require('socket.io-client');
const server = require('../app');
const ioBack = require('socket.io');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

beforeAll((done) => {
    httpServer = server.listen();
    httpServerAddr = httpServer.address();
    ioServer = ioBack(httpServer);
    done();
});

afterAll((done) => {
    ioServer.close();
    httpServer.close();
    done();
});

beforeEach((done) => {
    socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      done();
    });
});

afterEach((done) => {
    if (socket.connected) {
      socket.disconnect();
    }
    done();
});


describe('Live Sketch Test', () => {
    describe('Mouse Event', () => {
        test('should return mouse coordinate', done  => {
            const data = {
                x: 1,
                y: 2,
                px: 3,
                py: 4
            }
            socket.emit('mouse', data);

            setTimeout(() => {
                ioServer.on('mouse', data => {
                    expect(data).toHaveProperty('x');
                    expect(data).toHaveProperty('y');
                    expect(data).toHaveProperty('px');
                    expect(data).toHaveProperty('py');
                    done();
                })
            }, 500);
        });
    });
});