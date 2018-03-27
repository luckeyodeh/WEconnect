import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIxODE1MzYzLCJleHAiOjE1MjIyNDczNjN9.U0WCcpMiLPJpSFQBid35GU42ExV10FljUM0e_rpbvNk';

const Business = {
  name: `Good Fash Ltd ${Math.random() * 100}`,
  details: 'Good fashion.',
  location: 'lagos',
  category: 'fashion',
};

const User = {
  email: 'test@gmail.com',
  password: 'password',
  firstName: 'Adm',
  lastName: 'Adminn'
};


//  Add a business
describe('POST businesses/', () => {
  it('should be able to register a business', (done) => {
    chai.request(server)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send(Business)
      .end((err, res) => {
        expect(res)
          .to.have.status(201);
        expect(res.body)
          .to.be.a('object');
        done();
      });
  });

  it('should return 403 if no business name', (done) => {
    chai.request(server)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send({
        details: 'Good fashion.',
        location: 'lagos',
        category: 'fashion',
      })
      .end((err, res) => {
        expect(res)
          .to.have.status(403);
        expect(res.body)
          .to.be.a('object');
        done();
      });
  });
  it('should return 403 if name is undefined', (done) => {
    chai.request(server)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send({
        name: undefined,
        details: 'Good fashion.',
        location: 'lagos',
        category: 'fashion',
      })
      .end((err, res) => {
        expect(res)
          .to.have.status(403);
        expect(res.body)
          .to.be.a('object');
        done();
      });
  });
  it('should return 403 if name is empty', (done) => {
    chai.request(server)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send({
        name: '',
        details: 'Good fashion.',
        location: 'lagos',
        category: 'fashion',
      })
      .end((err, res) => {
        expect(res)
          .to.have.status(403);
        expect(res.body)
          .to.be.a('object');
        done();
      });
  });
});

//  Update a business
describe('PUT businesses/2', () => {
  it('should be able to update a business', (done) => {
    chai.request(server)
      .put('/api/v1/businesses/2')
      .set('x-access-token', token)
      .send({
        name: 'Good F Ltd',
        details: 'Good fashion always.',
        location: 'lagos',
        category: 'fashion',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('should return 404, if business cannot be found', (done) => {
    chai.request(server)
      .put('/api/v1/businesses/193992932')
      .set('x-access-token', token)
      .send({
        name: 'G fashion',
        details: 'very good',
        location: 'lagos',
        category: 'fashion',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

//  Get all businesses
describe('GET businesses/', () => {
  it('should get all businesses', (done) => {
    chai.request(server)
      .get('/api/v1/businesses')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  // Get Individual Business
  describe('GET busineesses/2', () => {
    it('should be able to get a business', (done) => {
      chai.request(server)
        .get('/api/v1/businesses/2')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
});

// Get Business Reviews
describe('Get businesses/2/reviews', () => {
  it('should be able to get reviews of a business', (done) => {
    chai.request(server)
      .get('/api/v1/businesses/2/reviews')
      .end((err, res) => {
        expect(res)
          .to.have.status(200);
        done();
      });
  });

  it('should return 404', (done) => {
    chai.request(server)
      .get('/api/v1/businesses/3627827/reviews')
      .end((err, res) => {
        expect(res)
          .to.have.status(404);
        done();
      });
  });
});

// Add A Review
describe('POST reviews/1', () => {
  it('should be able to add reviews to a business', (done) => {
    chai.request(server)
      .post('/api/v1/businesses/2/reviews')
      .set('x-access-token', token)
      .send({
        businessId: 1,
        userId: 1,
        content: 'Awesome.',
        star: 3,
      })
      .end((err, res) => {
        expect(res)
          .to.have.status(201);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('should return 404', (done) => {
    chai.request(server)
      .get('/api/v1/businesses/3627827/reviews')
      .end((err, res) => {
        expect(res)
          .to.have.status(404);
        done();
      });
  });
});


// Delete Business
describe('DELETE businesses/2', () => {
  it('should be able to delete a business', (done) => {
    chai.request(server)
      .delete('/api/v1/businesses/2')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res)
          .to.have.status(200);
        done();
      });
  });
  it('should return 404 if page cannot be found', (done) => {
    chai.request(server)
      .delete('/api/v1/businesses/6382392')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res)
          .to.have.status(404);
        done();
      });
  });
});

//  POST - Sign up
describe('POST auth/signup/', () => {
  //  POST - Should create a new User
  it('should create new user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(User)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(false);
        done();
      });
  });

  // POST Sign up- should return 400 if no email
  it('should return 400 if no eamil', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        password: 'password',
        lastName: 'Adminn',
        firstName: 'Adm'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(true);
        done();
      });
  });

  // POST Sign up - should return 400 if no password
  it('should return 400 if no password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@gmail.com',
        password: '',
        lastName: 'Adminn',
        firstName: 'Adm'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(true);
        done();
      });
  });
  // POST Sign up - should return 400
  it('should return 400 if user already exists', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@gmail.com',
        password: 'password',
        lastName: 'Adminn',
        firstName: 'Adm'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(true);
        done();
      });
  });
});

//  Post Log In- Should return 400
describe('(Bad Requests) POST auth/login/', () => {
  it('should return 400 if no password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@gmail.com',
        password: '',
      })
      .end((err, res) => {
        expect(res)
          .to.have.status(400);
        expect(res.body)
          .to.be.a('object');
        done();
      });
  });

  it('should return 400 if no email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: 'password',
      })
      .end((err, res) => {
        expect(res)
          .to.have.status(400);
        expect(res.body)
          .to.be.a('object');
        done();
      });
  });

  it('should return 400 if username or password is wrong', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'u@gmail.com',
        password: 'passing',
      })
      .end((err, res) => {
        expect(res)
          .to.have.status(400);
        expect(res.body)
          .to.be.a('object');
        done();
      });
  });
});

//  Post Log in - Should Login Successfully
describe('POST auth/login/', () => {
  it('should authenticate successfully', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: User.email,
        password: User.password,
      })
      .end((err, res) => {
        expect(res)
          .to.have.status(200);
        expect(res.body)
          .to.be.a('object');
        done();
      });
  });
});

describe('Get logout/', () => {
  it('should logout a user', (done) => {
    chai.request(server)
      .get('/api/v1/auth/logout')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Get users/1/', () => {
  it('should get a user', (done) => {
    chai.request(server)
      .get('/api/v1/users/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return 404', (done) => {
    chai.request(server)
      .get('/api/v1/users/10090886')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('Update users/1/', () => {
  it('should update a user', (done) => {
    chai.request(server)
      .put('/api/v1/users/1')
      .send({
        firstName: 'Adm',
        lastName: 'Admi',
      })
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
