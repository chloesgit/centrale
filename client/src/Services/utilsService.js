const tagCategories = [
  'pink',
  'red',
  'orange',
  'green',
  'cyan',
  'blue',
  'purple',
  'black',
  'yellow',
  'brown',
  'coral',
  'turquoise',
  'gold'
]
const genresFilter = [{
  text: 'Action',
  value: 'Action'
}, {
  text: 'Adventure',
  value: 'Adventure'
}, {
  text: 'Animation',
  value: 'Animation'
}, {
  text: 'Comedy',
  value: 'Comedy'
}, {
  text: 'Crime',
  value: 'Crime'
}, {
  text: 'Documentary',
  value: 'Documentary'
}, {
  text: 'Drama',
  value: 'Drama'
}, {
  text: 'Family',
  value: 'Family'
}, {
  text: 'Fantasy',
  value: 'Fantasy'
}, {
  text: 'History',
  value: 'History'
}, {
  text: 'Horror',
  value: 'Horror'
}, {
  text: 'Music',
  value: 'Music'
}, {
  text: 'Mystery',
  value: 'Mystery'
}, {
  text: 'Romance',
  value: 'Romance'
}, {
  text: 'Science Fiction',
  value: 'Science Fiction'
}, {
  text: 'TV Movie',
  value: 'TV Movie'
}, {
  text: 'Thriller',
  value: 'Thriller'
}, {
  text: 'War',
  value: 'War'
}, {
  text: 'Western',
  value: 'Western'
}]

const dictGenres = [
  {
    'id': 'Action',
    'name': 'Action'
  },
  {
    'id': 'Adventure',
    'name': 'Adventure'
  },
  {
    'id': 'Animation',
    'name': 'Animation'
  },
  {
    'id': 'Comedy',
    'name': 'Comedy'
  },
  {
    'id': 'Crime',
    'name': 'Crime'
  },
  {
    'id': 'Documentary',
    'name': 'Documentary'
  },
  {
    'id': 'Drama',
    'name': 'Drama'
  },
  {
    'id': 'Family',
    'name': 'Family'
  },
  {
    'id': 'Fantasy',
    'name': 'Fantasy'
  },
  {
    'id': 'History',
    'name': 'History'
  },
  {
    'id':'Horror',
    'name': 'Horror'
  },
  {
    'id': 'Music',
    'name': 'Music'
  },
  {
    'id': 'Mystery',
    'name': 'Mystery'
  },
  {
    'id': 'Romance',
    'name': 'Romance'
  },
  {
    'id': 'Science Fiction',
    'name': 'Science Fiction'
  },
  {
    'id': 'TV Movie',
    'name': 'TV Movie'
  },
  {
    'id':'Thriller',
    'name': 'Thriller'
  },
  {
    'id': 'War',
    'name': 'War'
  },
  {
    'id': 'Western',
    'name': 'Western'
  }
]

export default {
  randomColor: () => tagCategories[Math.floor(Math.random() * (tagCategories.length + 1))],
  getGenres: (id) => dictGenres.reduce((acc, genre) => (id === genre.id) ? (acc += genre.name) : acc, ''),
  getFilter: () => genresFilter
}
function sleeps (milliseconds)  {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}