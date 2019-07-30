const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

// before((done) => {
//   httpServer = http.createServer().listen();
//   httpServerAddr = httpServer.listen().address();
//   ioServer = ioBack(httpServer);
//   done();
// });

// after((done) => {
//   ioServer.close();
//   httpServer.close();
//   done();
// });
// beforeEach((done) => {
//   socket = io.connect(`http:/localhost:3000`, {
//     'reconnection delay': 0,
//     'reopen delay': 0,
//     'force new connection': true,
//     transports: ['websocket'],
//   });
//   afterEach((done) => {
//     // Cleanup
//     if (socket.connected) {
//       socket.disconnect();
//     }
//     done();
//   });
//   socket.on('connect', () => {
//     done();
//   });
// });
const mockData = {
  "username": "viryse",
  "userimage": "https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg",
  "posts": [{
      "imageURL": "https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg",
      "caption": "Unplug and unwind",
      "likes": 2842,
      "date": 2017
    },
    {
      "imageURL": "https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg",
      "caption": "Kalau senen bisa seru, kenapa nggak? #kenapaya?",
      "likes": 2369,
      "date": "2017"
    },
    {
      "imageURL": "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "caption": "Clubstyle ✌️ #fxdc #clubstyle #dyna",
      "likes": 2369,
      "date": "2017"
    },
    {
      "imageURL": "https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg",
      "caption": "Unplug and unwind",
      "likes": 2842,
      "date": 2017
    },
    {
      "imageURL": "https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg",
      "caption": "If monday can be fun, Wae Rebo? #kenapaya?",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "caption": "Clubstyle ✌️ #fxdc #clubstyle #dyna",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "One of those places where you’d feel so young 👨🏻👵🏻",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg",
      "caption": "Unplug and unwind",
      "likes": 2842,
      "date": 2017
    },
    {
      "imageURL": "https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg",
      "caption": "Kalau senen bisa seru, kenapa nggak? #kenapaya?",
      "likes": 2369,
      "date": "2017"
    },
    {
      "imageURL": "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "caption": "Clubstyle ✌️ #fxdc #clubstyle #dyna",
      "likes": 2369,
      "date": "2017"
    },
    {
      "imageURL": "https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg",
      "caption": "Unplug and unwind",
      "likes": 2842,
      "date": 2017
    },
    {
      "imageURL": "https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg",
      "caption": "If monday can be fun, Wae Rebo? #kenapaya?",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "caption": "Clubstyle ✌️ #fxdc #clubstyle #dyna",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "One of those places where you’d feel so young 👨🏻👵🏻",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    },
    {
      "imageURL": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "caption": "Iceland is petrifying.",
      "likes": 2369,
      "date": 2017
    }
  ]
}

chai.use(chaiHttp);

describe('Analysis Controller Test', () => {
  describe('GET /', () => {
    it("expected error to be null", (done) => {
      chai
        .request(app)
        .get("/")
        .end(function (err, res) {
          expect(err).to.be.null;
          done()
        });
    });
  
    it("expected have response 200 with text 'Hello World, I am Instanalysiss'", (done) => {
      chai
        .request(app)
        .get("/")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.equal('Hello World, I am Instanalysiss');
          done()
        });
    });

    it("expected have response 200 with text 'Hello World, I am Instanalysiss'", (done) => {
      chai
        .request(app)
        .post("/analysis")
        .send(mockData)
        .end(function (err, res) {

          expect(res).to.have.status(200);
          expect(res.body).to.equal('request successful');
          done()
        });
    });
  })
  // describe('basic socket.io example', () => {
  //   it('should communicate', (done) => {
  //     // once connected, emit Hello World
  //     ioServer.emit('echo', 'Hello World');
  //     socket.once('echo', (message) => {
  //       // Check that the message matches
  //       expect(message).toBe('Hello World');
  //       done();
  //     });
  //     ioServer.on('connection', (mySocket) => {
  //       expect(mySocket).toBeDefined();
  //     });
  //   });
  // });

})