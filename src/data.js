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
    songs: ["Heaven and Hell", "Iron Man", "Laguna Sunrise", "War Pigs"],
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
    songs: ["Fear of the Dark", "The Trooper", "Transylvania"],
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
    songs: ["Blitzkrieg Bop", "I Wanna Be Sedated", "Pet Sematary"],
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
  //////////////////////////////////////////
  // 22
  {
    name: "Pearl Jam",
    songs: ["Alive", "Black", "Even Flow"],
  },
];

const songs = [
  { name: "Dancing Queen", artist: "ABBA" },
  { name: "Highway to Hell", artist: "AC/DC" },
  { name: "Thunderstruck", artist: "AC/DC" },
  { name: "Dancing with Myself", artist: "Billy Idol" },
  { name: "White Wedding", artist: "Billy Idol" },
  { name: "Livin' On A Prayer", artist: "Bon Jovi" },
  { name: "You Give Love a Bad Name", artist: "Bon Jovi" },
  { name: "Holding Out for a Hero", artist: "Bonnie Tyler" },
  { name: "Burning Beard", artist: "Clutch" },
  { name: "Power Player", artist: "Clutch" },
  { name: "Layla", artist: "Derek & the Dominos" },
  { name: "Highway Star", artist: "Deep Purple" },
  { name: "Hush", artist: "Deep Purple" },
  { name: "Riders on the Storm", artist: "The Doors" },
  { name: "Rising", artist: "Dozer" },
  { name: "Layla", artist: "Eric Clapton" },
  { name: "Tears in Heaven", artist: "Eric Clapton" },
  { name: "Welcome to the Jungle", artist: "Guns 'N Roses" },
  { name: "Sweet Child O' Mine", artist: "Guns 'N Roses" },
  { name: "Dr. Feelgood", artist: "Mötley Crüe" },
  { name: "Don't Stop Believin'", artist: "Journey" },
  { name: "Never Gonna Give You Up", artist: "Rick Astley" },
  { name: "Beat It", artist: "Michael Jackson" },
  { name: "Don't Stop 'Til You Get Enough", artist: "Michael Jackson" },
  { name: "Thriller", artist: "Michael Jackson" },
  { name: "Eye of the Tiger", artist: "Survivor" },
  { name: "What Is Love", artist: "Haddaway" },
  { name: "Hey Joe", artist: "Jimi Hendrix" },
  { name: "Stairway to Heaven", artist: "Led Zeppelin" },
  { name: "Bohemian Rhapsody", artist: "Queen" },
  { name: "Radio Ga Ga", artist: "Queen" },
  { name: "More", artist: "Sisters of Mercy" },
  { name: "Temple of Love", artist: "Sisters of Mercy" },
  { name: "Shout", artist: "Tears for Fears" },
  { name: "Heads Over Heels", artist: "Tears for Fears" },
  { name: "Jailbreak", artist: "Thin Lizzy" },
  { name: "The Boys Are Back In Town", artist: "Thin Lizzy" },
  { name: "Born To Be Wild", artist: "Steppenwolf" },
  { name: "Money For Nothing", artist: "Dire Straits" },
  { name: "Sultans of Swing", artist: "Dire Straits" },
  { name: "I Wanna Be Sedated", artist: "Ramones" },
  { name: "Pet Sematary", artist: "Ramones" },
  { name: "Poison Heart", artist: "Ramones" },
  { name: "Holiday In Cambodia", artist: "Dead Kennedys" },
  { name: "Anarchy In The UK", artist: "Sex Pistols" },
  { name: "God Save The Queen", artist: "Sex Pistols" },
  { name: "London Calling", artist: "The Clash" },
  { name: "Should I Stay or Should I Go", artist: "The Clash" },
  { name: "White Riot", artist: "The Clash" },
  { name: "1892 Overture", artist: "Pyotr Tchaikovsky" },
  {
    name: "Toccata and Fugue in D minor, BWV 565",
    artist: "Johann Sebastian Bach",
  },
  { name: "Hungarian Dance No. 5", artist: "Johannes Brahms" },
  { name: "Piano Sonata No. 14", artist: "Ludwig van Beethoven" },
  { name: "Symphony No. 5", artist: "Ludwig van Beethoven" },
  { name: "Ride of the Valkyries", artist: "Richard Wagner" },
  { name: "Free Bird", artist: "Lynyrd Skynyrd" },
  { name: "Panama", artist: "Van Halen" },
  { name: "Eruption", artist: "Van Halen" },
  { name: "The Trooper", artist: "Iron Maiden" },
  { name: "Wasted Years", artist: "Iron Maiden" },
  { name: "The Spirit of Radio", artist: "Rush" },
  { name: "Subdivisions", artist: "Rush" },
  { name: "YYZ", artist: "Rush" },
  { name: "21st Century Schizoid Man", artist: "King Crimson" },
  { name: "Starless", artist: "King Crimson" },
  { name: "Salisbury", artist: "Uriah Heep" },
  { name: "Roundabout", artist: "Yes" },
  { name: "Time", artist: "Pink Floyd" },
  { name: "Hide In Your Shell", artist: "Supertramp" },
  { name: "Man in the Box", artist: "Alice in Chains" },
  { name: "Them Bones", artist: "Alice in Chains" },
  { name: "Smells Like Teen Spirit", artist: "Nirvana" },
  { name: "Black", artist: "Pearl Jam" },
  { name: "Even Flow", artist: "Pearl Jam" },
  { name: "Jeremy", artist: "Pearl Jam" },
  { name: "Interstate Love Song", artist: "Stone Temple Pilots" },
  { name: "Epic", artist: "Faith No More" },
  { name: "Black No. 1", artist: "Type O Negative" },
  { name: "Love You to Death", artist: "Type O Negative" },
  { name: "Heaven and Hell", artist: "Black Sabbath" },
  { name: "Iron Man", artist: "Black Sabbath" },
  { name: "Sabbra Cadabra", artist: "Black Sabbath" },
  { name: "Breadfan", artist: "Budgie" },
  { name: "Rock Bottom", artist: "UFO" },
  { name: "Electric Eye", artist: "Judas Priest" },
  { name: "Victim of Changes", artist: "Judas Priest" },
  { name: "Ace of Spades", artist: "Motörhead" },
  { name: "Master of Puppets", artist: "Metallica" },
  { name: "Enter Sandman", artist: "Metallica" },
  { name: "Holy Wars... the Punishment Due", artist: "Megadeth" },
  { name: "Peace Sells", artist: "Megadeth" },
  { name: "Cowboys from Hell", artist: "Pantera" },
  { name: "Gardenia", artist: "Kyuss" },
  { name: "Green Machine", artist: "Kyuss" },
  { name: "Space Cadet", artist: "Kyuss" },
  { name: "Negasonic Teenage Warhead", artist: "Monster Magnet" },
  { name: "Powertrip", artist: "Monster Magnet" },
  { name: "Joker And The Thief", artist: "Wolfmother" },
  { name: "New Moon Rising", artist: "Wolfmother" },
  { name: "La Grange", artist: "ZZ Top" },
  { name: "Sharp Dressed Man", artist: "ZZ Top" },
];

const errorMessage = {
  artists: [
    "ERRO: Artista especificado não encontrado.",
    "ERRO: Não há artistas disponíveis.",
  ],
  playlists: [
    "ERRO: Playlist não encontrada.",
    "ERRO: Não há playlists disponíveis.",
  ],
  songs: ["ERRO: Música não encontrada.", "ERRO: Não há músicas disponíveis."],
  users: [
    "ERRO: Usuário não encontrado.",
    "ERRO: Não há usuários disponíveis.",
  ],
};

module.exports = { artists, songs, errorMessage };

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
