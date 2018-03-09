const db = [];

db.business = [{
  id: 1,
  name: 'MyBukka Nigeria',
  details: 'We deliver your meals when and where you want them',
  location: 'lagos',
  category: 'restaurant',
  reviews: [
    {
      reviewId: 1,
      user: 'dummy1',
      content: 'very awesome',
      stars: 4
    },
    {
      reviewId: 2,
      user: 'dummy2',
      content: 'not good',
      stars: 2
    }
  ]
},
{
  id: 2,
  name: 'Warehouse Global Links',
  details: 'Your best choice for internet solutions',
  location: 'lagos',
  category: 'ict',
  reviews: [
    {
      reviewId: 1,
      user: 'dummy1',
      content: 'i think they are fair',
      stars: 3,
    },
    {
      reviewId: 2,
      user: 'dummy2',
      content: 'very awesome',
      stars: 4
    },
    {
      reviewId: 3,
      user: 'dummy3',
      content: 'bad bad',
      stars: 2
    },
  ]
},
{
  id: 3,
  name: 'BC Materials',
  details: 'Home of high quality construction materials',
  location: 'abuja',
  category: 'construction',
  reviews: [
    {
      reviewId: 1,
      user: 'dummy1',
      content: 'awesome',
      stars: 4,
    },
    {
      reviewId: 2,
      user: 'dummy2',
      content: 'great',
      stars: 4
    },
    {
      reviewId: 3,
      user: 'dummy3',
      content: 'very good',
      stars: 4,
    }
  ]
},
];

export default db;
