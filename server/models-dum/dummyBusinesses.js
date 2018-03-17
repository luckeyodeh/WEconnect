const db = [];

db.business = [{
  id: 1,
  name: 'Moremi Gloals',
  details: 'Best Ict Resources',
  location: 'lagos',
  category: 'ICT',
  reviews: [
    {
      user: 'rotimi',
      content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, ullam.',
      stars: 3,
    },
    {
      user: 'seyi',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      stars: 5
    },
    {
      user: 'lanre',
      content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      stars: 4,
    }
  ]
},
{
  id: 2,
  name: 'Winners Foods',
  details: 'Amazings Foods',
  location: 'Abuja',
  category: 'Food',
  reviews: [
    {
      user: 'rotimi',
      content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, ullam.',
      stars: 3,
    },
    {
      user: 'seyi',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      stars: 5
    },
  ]
},
{
  id: 3,
  name: 'Sr Fashion',
  details: 'Get the best clothes',
  location: 'lagos',
  category: 'Fashion',
  reviews: [
    {
      reviewer: 'rotimi',
      content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, ullam.',
      stars: 3,
    },
    {
      reviewer: 'seyi',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      stars: 5
    },
    {
      reviewer: 'lanre',
      content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      stars: 4,
    }
  ]
},
];

export default db;
