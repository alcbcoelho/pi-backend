const artists = [
  // 1
  {
    name: "AC/DC",
    songs: ["Highway to Hell", "Thunderstruck", "Whole Lotta Rosie"],
  },
  // 2
  {
    name: "Aerosmith",
    songs: ["Cryin'", "Dream On", "Walk This Way"],
  },
  // 3
  {
    name: "Alice In Chains",
    songs: ["Man in the Box", "Real Thing", "Them Bones"],
  },
  // 4
  {
    name: "Billy Idol",
    songs: ["Dancing with Myself", "Eyes Without a Face", "White Wedding"],
  },
  // 5
  {
    name: "Black Sabbath",
    songs: ["Heaven and Hell", "Iron Man", "War Pigs"],
  },
  // 6
  {
    name: "The Clash",
    songs: ["London Calling", "Should I Stay or Should I Go", "White Riot"],
  },
  // 7
  {
    name: "Clutch",
    songs: ["Burning Beard", "Earth Rocker", "Electric Worry"],
  },
  // 8
  {
    name: "Deep Purple",
    songs: ["Child In Time", "Highway Star", "Perfect Strangers"],
  },
  // 9
  {
    name: "Disturbed",
    songs: ["Down with the Sickness", "Indestructible", "Prayer"],
  },
  // 10
  {
    name: "Five Finger Death Punch",
    songs: ["Bad Company", "Jekyll and Hyde", "Lift Me Up"],
  },
  // 11
  {
    name: "Guns N' Roses",
    songs: [
      "Knocking On Heaven's Door",
      "November Rain",
      "Welcome to the Jungle",
    ],
  },
  // 12
  {
    name: "Iron Maiden",
    songs: ["2 Minutes to Midnight", "Fear of the Dark", "Wrathchild"],
  },
  // 13
  {
    name: "Led Zeppelin",
    songs: ["Dazed and Confused", "Kashmir", "Stairway to Heaven"],
  },
  // 14
  {
    name: "Michael Jackson",
    songs: ["Beat It", "Don't Stop 'Til You Get Enough", "Thriller"],
  },
  // 15
  {
    id: 1,
    name: "Queen",
    songs: ["Bohemian Rhapsody", "Radio Ga Ga", "Under Pressure"],
  },
  // 16
  {
    name: "Ramones",
    songs: ["Blitzkrieg Bop", "Pet Sematary", "Poison Heart"],
  },
  // 17
  {
    name: "Rush",
    songs: ["The Spirit of Radio", "Tom Sawyer", "YYZ"],
  },
  // 18
  {
    name: "Sisters of Mercy",
    songs: ["Dominion / Mother Russia", "More", "Temple of Love"],
  },
  // 19
  {
    name: "Tears for Fears",
    songs: ["Head Over Heels", "Mad World", "Shout"],
  },
  // 20
  {
    name: "Type O Negative",
    songs: ["Black No. 1", "Christian Woman", "Love You to Death"],
  },
  // 21
  {
    name: "Van Halen",
    songs: ["Eruption", "Jump", "Panama"],
  },
];

const errorMessage = {
    artists: [
      "ERRO: Artista não encontrado.",
      "ERRO: Não há artistas disponíveis."
    ],
    playlists: [
      "ERRO: Playlist não encontrada.",
      "ERRO: Não há playlists disponíveis."
    ],
    songs: [
      "ERRO: Música não encontrada.",
      "ERRO: Não há músicas disponíveis."
    ]
  }

module.exports = { artists, errorMessage };

/*
AC/DC
Aerosmith
Alice In Chains
Billy Idol
Black Sabbath
The Clash
Clutch
Deep Purple
Disturbed
Five Finger Death Punch
Guns N' Roses
Iron Maiden
Led Zeppelin
Michael Jackson
Queen
Ramones
Rush
Sisters of Mercy
Tears for Fears
Type O Negative
Van Halen
*/