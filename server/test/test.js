import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

/*const User = {
  username: `username${Math.random()}`,
  email: `user${Math.random()}@user.com`,
  password: 'passw0RD',
};*/

const User = {
  id: 1,
  email: 'dummy1@dummy.com',
  password: 'test'
};

const Business = {
  id: 1,
  name: 'MyBukka Nigeria',
  details: 'We deliver your meals when and where you want them',
  location: 'lagos',
  category: 'restaurant',
};

//  POST - Should create a new User
describe('POST auth/signup/', () => {
  it('should create new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(User)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(false);
        done();
      });
  });
});

//  Post - Should return 400
describe('(Bad Requests) POST auth/login/', () => {
  it('should return 400 if input is wrong', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'dummy1@dummy.com',
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

  it('should return 400 if undefined', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: undefined,
        password: undefined,
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

//  Post - Should Login Successfully
describe('POST auth/login/', () => {
  it('should authenticate successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'dummy1@dummy.com',
        password: 'test',
      })
      .end((err, res) => {
        expect(res)
          .to.have.status(200);
        expect(res.body)
          .to.be.a('object');
        done();
      });
  });
  it('should authenticate successfully', (done) => {
    chai.request(app)
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

//  Get all businesses
describe('GET businesses/', () => {
  it('should get all business', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

//  Add a business
describe('POST businesses/', () => {
  it('should be able to register a business', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .send(Business)
      .end((err, res) => {
        expect(res)
          .to.have.status(201);
        expect(res.body)
          .to.be.a('object');
        done();
      });
  });
});


// Get Individual Business
describe('GET busineesses/3', () => {
  it('should be able to get a business', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/3')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

// Update Business
describe('PUT businesses/3', () => {
  it('should be able to update a business', (done) => {
    chai.request(app)
      .put('/api/v1/businesses/3')
      .send({
        name: 'Electric Holdings',
        details: 'We sell elctrical materials',
        location: 'abuja',
        category: 'sale'
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

// Add A Review
describe('POST reviews/3', () => {
  it('should be able to add reviews to a business', (done) => {
    chai.request(app)
      .post('/api/v1/businesses/3/reviews')
      .send({
        user: 'dummy3',
        content: 'i am impressed by your service',
        stars: 5,
      })
      .end((err, res) => {
        expect(res)
          .to.have.status(201);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

// Get Business Reviews
describe('Get businesses/3/reviews', () => {
  it('should be able to get reviews of a business', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/3/reviews')
      .end((err, res) => {
        expect(res)
          .to.have.status(200);
        done();
      });
  });
});

// Delete Business
describe('DELETE businesses/3', () => {
  it('should be able to delete a business', (done) => {
    chai.request(app)
      .delete('/api/v1/businesses/3')
      .end((err, res) => {
        expect(res)
          .to.have.status(200);
        done();
      });
  });
});

// Get Business Location
describe('Get businesses/location/:location', () => {
  it('should be able to get businesses in a location', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?location=lagos')
      .end((err, res) => {
        expect(res)
          .to.have.status(200);
        done();
      });
  });
});

// Get Business Category
describe('Get businesses/category/:category', () => {
  it('should be able to get businesses in a category', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?category=restaurant')
      .end((err, res) => {
        expect(res)
          .to.have.status(200);
        done();
      });
  });
});
