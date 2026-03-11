export const categories = [
  { id: '1', name: 'Action' },
  { id: '2', name: 'Comedy' },
  { id: '3', name: 'Drama' },
  { id: '4', name: 'Sci-Fi' },
  { id: '5', name: 'Thriller' },
  { id: '6', name: 'Documentary' },
  { id: '7', name: 'Horror' }
];

export const mockVideos = [
  {
    id: 'v1',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
    trailerUrl: 'https://www.youtube.com/embed/8hP9D6kZseM',
    duration: '148m',
    releaseYear: 2010,
    type: 'FILM',
    categoryId: '4', // Sci-Fi
    rating: 8.8,
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page']
  },
  {
    id: 'v2',
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1610337673044-720471f83677?w=800&q=80',
    trailerUrl: 'https://www.youtube.com/embed/b9EkMc79ZSU',
    duration: '45m/ep',
    releaseYear: 2016,
    type: 'SERIE',
    categoryId: '4', // Sci-Fi
    rating: 8.7,
    director: 'The Duffer Brothers',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder']
  },
  {
    id: 'v3',
    title: 'Our Planet',
    description: 'Documentary series focusing on the breadth of the diversity of habitats around the world, from the remote Arctic wilderness and mysterious deep oceans to the vast landscapes of Africa and diverse jungles of South America.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    trailerUrl: 'https://www.youtube.com/embed/aGQTrKG-k4I',
    duration: '50m/ep',
    releaseYear: 2019,
    type: 'DOCUMENTAIRE',
    categoryId: '6', // Documentary
    rating: 9.3,
    director: 'Alastair Fothergill',
    cast: ['David Attenborough']
  },
  {
    id: 'v4',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&q=80',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    duration: '152m',
    releaseYear: 2008,
    type: 'FILM',
    categoryId: '1', // Action
    rating: 9.0,
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart']
  },
  {
    id: 'v5',
    title: 'Get Out',
    description: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=800&q=80',
    trailerUrl: 'https://www.youtube.com/embed/DzfpyUB60YY',
    duration: '104m',
    releaseYear: 2017,
    type: 'FILM',
    categoryId: '7', // Horror
    rating: 7.7,
    director: 'Jordan Peele',
    cast: ['Daniel Kaluuya', 'Allison Williams', 'Bradley Whitford']
  }
];

export const generateId = () => Math.random().toString(36).substring(2, 11);
