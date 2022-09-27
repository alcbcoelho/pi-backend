const { User } = require("./classes/User"); 

const songs = [
  { id: undefined, name: "Dancing Queen", artist: "ABBA" },
  { id: undefined, name: "Highway to Hell", artist: "AC/DC" },
  { id: undefined, name: "Thunderstruck", artist: "AC/DC" },
  { id: undefined, name: "Man in the Box", artist: "Alice in Chains" },
  { id: undefined, name: "Them Bones", artist: "Alice in Chains" },
  { id: undefined, name: "Dancing with Myself", artist: "Billy Idol" },
  { id: undefined, name: "White Wedding", artist: "Billy Idol" },
  { id: undefined, name: "Livin' On A Prayer", artist: "Bon Jovi" },
  { id: undefined, name: "You Give Love a Bad Name", artist: "Bon Jovi" },
  { id: undefined, name: "Holding Out for a Hero", artist: "Bonnie Tyler" },
  { id: undefined, name: "Rise Above", artist: "Black Flag" },
  { id: undefined, name: "Heaven and Hell", artist: "Black Sabbath" },
  { id: undefined, name: "Iron Man", artist: "Black Sabbath" },
  { id: undefined, name: "Symptom of the Universe", artist: "Black Sabbath" },
  { id: undefined, name: "Machinehead", artist: "Bush" },
  { id: undefined, name: "London Calling", artist: "The Clash" },
  { id: undefined, name: "Should I Stay or Should I Go", artist: "The Clash" },
  { id: undefined, name: "White Riot", artist: "The Clash" },
  { id: undefined, name: "Burning Beard", artist: "Clutch" },
  { id: undefined, name: "Power Player", artist: "Clutch" },
  { id: undefined, name: "New Rose", artist: "The Damned" },
  { id: undefined, name: "Holiday In Cambodia", artist: "Dead Kennedys" },
  { id: undefined, name: "Kill the Poor", artist: "Dead Kennedys" },
  { id: undefined, name: "You Spin Me Round (Like a Record)", artist: "Dead or Alive" },
  { id: undefined, name: "Layla", artist: "Derek and the Dominos" },
  { id: undefined, name: "Highway Star", artist: "Deep Purple" },
  { id: undefined, name: "Perfect Strangers", artist: "Deep Purple" },
  { id: undefined, name: "Am I Evil?", artist: "Diamond Head" },
  { id: undefined, name: "Money For Nothing", artist: "Dire Straits" },
  { id: undefined, name: "Sultans of Swing", artist: "Dire Straits" },
  { id: undefined, name: "Riders on the Storm", artist: "The Doors" },
  { id: undefined, name: "Layla", artist: "Eric Clapton" },
  { id: undefined, name: "Epic", artist: "Faith No More" },
  { id: undefined, name: "Welcome to the Jungle", artist: "Guns 'N Roses" },
  { id: undefined, name: "Sweet Child O' Mine", artist: "Guns 'N Roses" },
  { id: undefined, name: "The Trooper", artist: "Iron Maiden" },
  { id: undefined, name: "Wasted Years", artist: "Iron Maiden" },
  { id: undefined, name: "Aqualung", artist: "Jethro Tull" },
  { id: undefined, name: "Hey Joe", artist: "Jimi Hendrix" },
  { id: undefined, name: "Hungarian Dance No. 5", artist: "Johannes Brahms" },
  {
    id: undefined,
    name: "Toccata and Fugue in D minor, BWV 565",
    artist: "Johann Sebastian Bach",
  },
  { id: undefined, name: "Don't Stop Believin'", artist: "Journey" },
  { id: undefined, name: "Electric Eye", artist: "Judas Priest" },
  { id: undefined, name: "Painkiller", artist: "Judas Priest" },
  { id: undefined, name: "21st Century Schizoid Man", artist: "King Crimson" },
  { id: undefined, name: "Starless", artist: "King Crimson" },
  { id: undefined, name: "Gardenia", artist: "Kyuss" },
  { id: undefined, name: "Green Machine", artist: "Kyuss" },
  { id: undefined, name: "Stairway to Heaven", artist: "Led Zeppelin" },
  { id: undefined, name: "Free Bird", artist: "Lynyrd Skynyrd" },
  { id: undefined, name: "Piano Sonata No. 14", artist: "Ludwig van Beethoven" },
  { id: undefined, name: "Symphony No. 5", artist: "Ludwig van Beethoven" },
  { id: undefined, name: "Peace Sells", artist: "Megadeth" },
  { id: undefined, name: "Tornado of Souls", artist: "Megadeth" },
  { id: undefined, name: "Enter Sandman", artist: "Metallica" },
  { id: undefined, name: "Master of Puppets", artist: "Metallica" },
  { id: undefined, name: "Beat It", artist: "Michael Jackson" },
  { id: undefined, name: "Thriller", artist: "Michael Jackson" },
  { id: undefined, name: "Negasonic Teenage Warhead", artist: "Monster Magnet" },
  { id: undefined, name: "Powertrip", artist: "Monster Magnet" },
  { id: undefined, name: "Dr. Feelgood", artist: "Mötley Crüe" },
  { id: undefined, name: "Ace of Spades", artist: "Motörhead" },
  { id: undefined, name: "Smells Like Teen Spirit", artist: "Nirvana" },
  { id: undefined, name: "Crazy Train", artist: "Ozzy Osbourne" },
  { id: undefined, name: "Cowboys from Hell", artist: "Pantera" },
  { id: undefined, name: "Even Flow", artist: "Pearl Jam" },
  { id: undefined, name: "Jeremy", artist: "Pearl Jam" }, //
  { id: undefined, name: "Time", artist: "Pink Floyd" },
  { id: undefined, name: "1892 Overture", artist: "Pyotr Tchaikovsky" },
  { id: undefined, name: "Bohemian Rhapsody", artist: "Queen" },
  { id: undefined, name: "Radio Ga Ga", artist: "Queen" },
  { id: undefined, name: "I Wanna Be Sedated", artist: "Ramones" },
  { id: undefined, name: "Ride of the Valkyries", artist: "Richard Wagner" },
  { id: undefined, name: "Never Gonna Give You Up", artist: "Rick Astley" },
  { id: undefined, name: "The Spirit of Radio", artist: "Rush" },
  { id: undefined, name: "Subdivisions", artist: "Rush" },
  { id: undefined, name: "Rock You Like A Hurricane", artist: "Scorpions" },
  { id: undefined, name: "Anarchy In The UK", artist: "Sex Pistols" },
  { id: undefined, name: "God Save The Queen", artist: "Sex Pistols" },
  { id: undefined, name: "Temple of Love", artist: "Sisters of Mercy" },
  { id: undefined, name: "Bullet with Butterfly Wings", artist: "Smashing Pumpkins" },
  { id: undefined, name: "Left Brain Ambassadors", artist: "Spiritual Beggars" },
  { id: undefined, name: "Interstate Love Song", artist: "Stone Temple Pilots" },
  { id: undefined, name: "Institutionalized", artist: "Suicidal Tendencies" },
  { id: undefined, name: "Fool's Overture", artist: "Supertramp" },
  { id: undefined, name: "Eye of the Tiger", artist: "Survivor" },
  { id: undefined, name: "Head Over Heels", artist: "Tears for Fears" },
  { id: undefined, name: "Shout", artist: "Tears for Fears" },
  { id: undefined, name: "Jailbreak", artist: "Thin Lizzy" },
  { id: undefined, name: "The Boys Are Back In Town", artist: "Thin Lizzy" },
  { id: undefined, name: "Black No. 1", artist: "Type O Negative" },
  { id: undefined, name: "Love You to Death", artist: "Type O Negative" },
  { id: undefined, name: "Salisbury", artist: "Uriah Heep" },
  { id: undefined, name: "Jump", artist: "Van Halen" },
  { id: undefined, name: "Panama", artist: "Van Halen" },
  { id: undefined, name: "Joker And The Thief", artist: "Wolfmother" },
  { id: undefined, name: "New Moon Rising", artist: "Wolfmother" },
  { id: undefined, name: "Roundabout", artist: "Yes" },
  { id: undefined, name: "La Grange", artist: "ZZ Top" },
  { id: undefined, name: "Sharp Dressed Man", artist: "ZZ Top" },
];

const playlists = [
  {
    id: 1,
    name: "Rock Anos 70",
    author: "/users/1",
    songs: [
      "/songs/49",  // Led Zeppelin - Stairway to Heaven
      "/songs/99",  // ZZ Top - La Grange
      "/songs/26",  // Deep Purple - Highway Star
      "/songs/39",  // Jimi Hendrix - Hey Joe
      "/songs/13",  // Black Sabbath - Iron Man
      "/songs/89",  // Thin Lizzy - Jailbreak
      "/songs/31",  // The Doors - Riders on the Storm
      "/songs/2",   // AC/DC - Highway to Hell
      "/songs/25",  // Derek and the Dominos - Layla
      "/songs/70",  // Queen - Bohemian Rhapsody
      "/songs/30",  // Dire Straits - Sultans of Swing
      "/songs/50"  // Lynyrd Skynyrd - Free Bird
    ],
  },
  {
    id: 2,
    name: "Rock Anos 80",
    author: "/users/2",
    songs: [
      "/songs/75",  // Rush - The Spirit of Radio
      "/songs/29",  // Dire Straits - Money for Nothing
      "/songs/61",  // Mötley Crue - Dr. Feelgood
      "/songs/27",  // Deep Purple - Perfect Strangers
      "/songs/95",  // Van Halen - Panama
      "/songs/34",  // Guns 'N Roses - Welcome to the Jungle
      "/songs/100",  // ZZ Top - Sharp Dressed Man
      "/songs/9",  // Bon Jovi - You Give Love a Bad Name
      "/songs/77",  // Scorpions - Rock You Like A Hurricane
      "/songs/35"  // Guns 'N Roses - Sweet Child O' Mine
    ],
  },
  {
    id: 3,
    name: "Rock Anos 90 e Grunge",
    author: "/users/3",
    songs: [
      "/songs/63",  // Nirvana - Smells Like Teen Spirit
      "/songs/91",  // Type O Negative - Black No. 1
      "/songs/15",  // Bush - Machinehead
      "/songs/66",  // Pearl Jam - Even Flow
      "/songs/5",  // Alice in Chains - Them Bones
      "/songs/83",  // Stone Temple Pilots - Interstate Love Song
      "/songs/92",  // Type O Negative - Love You to Death
      "/songs/81",  // Smashing Pumpkins - Bullet with Butterfly Wings
      "/songs/4",  // Alice in Chains - Man in the Box
      "/songs/33"  // Faith No More - Epic
    ],
  },
  {
    id: 4,
    name: "Metal",
    author: "/users/4",
    songs: [
      "/songs/43",  // Judas Priest - Electric Eye
      "/songs/12",  // Black Sabbath - Heaven and Hell
      "/songs/3",  // AC/DC - Thunderstruck
      "/songs/64",  // Ozzy Osbourne - Crazy Train
      "/songs/62",  // Motörhead - Ace of Spades
      "/songs/48",  // Kyuss - Green Machine
      "/songs/36",  // Iron Maiden - The Trooper
      "/songs/28",  // Diamond Head - Am I Evil?
      "/songs/54",  // Megadeth - Tornado of Souls
      "/songs/55",  // Metallica - Enter Sandman
      "/songs/14",  // Black Sabbath - Symptom of the Universe
      "/songs/44",  // Judas Priest - Painkiller
      "/songs/65",  // Pantera - Cowboys from Hell
      "/songs/56",  // Metallica - Master of Puppets
      "/songs/53"  // Megadeth - Peace Sells
    ],
  },
  {
    id: 5,
    name: "Clássica",
    author: "/users/5",
    songs: [
      "/songs/41",  // Johann Sebastian Bach - Toccata and Fugue in D minor, BWV 565
      "/songs/51",  // Ludwing van Beethoven - Piano Sonata No. 14
      "/songs/69",  // 1892 Overture
      "/songs/40",  // Johann Brahms - Hungarian Dance No. 5
      "/songs/73",  // Richard Wagner - Ride of the Valkyries
      "/songs/52"  // Ludwing van Beethoven - Symphony No. 5
    ],
  },
  {
    id: 6,
    name: "Rock Progressivo",
    author: "/users/6",
    songs: [
      "/songs/98",  // Yes - Roundabout
      "/songs/45",  // King Crimson - 21st Century Schizoid Man
      "/songs/76",  // Rush - Subdivisions
      "/songs/85",  // Supertramp - Fool's Overture
      "/songs/38",  // Jethro Tull - Aqualung
      "/songs/68",  // Pink Floyd - Time
      "/songs/93",  // Uriah Heep - Salisbury
      "/songs/46"  // King Crimson - Starless
    ],
  },
  {
    id: 7,
    name: "Punk Rock",
    author: "/users/7",
    songs: [
      "/songs/72",  // Ramones - I Wanna Be Sedated
      "/songs/21",  // The Damned - New Rose
      "/songs/78",  // Sex Pistols - Anarchy in the UK
      "/songs/16",  // The Clash - London Calling
      "/songs/23",  // Dead Kennedys - Kill the Poor
      "/songs/11",  // Black Flag - Rise Above
      "/songs/79",  // Sex Pistols - God Save The Queen
      "/songs/84",  // Suicidal Tendencies - Institutionalized
      "/songs/18",  // The Clash - White Riot
      "/songs/22"  // Dead Kennedys - Holiday In Cambodia
    ],
  },
  {
    id: 8,
    name: "Stoner Rock",
    author: "/users/8",
    songs: [
      "/songs/82",  // Spiritual Beggars - Left Brain Ambassadors
      "/songs/20",  // Clutch - Power Player
      "/songs/47",  // Kyuss - Gardenia
      "/songs/97",  // Wolfmother - New Moon Rising
      "/songs/60",  // Monster Magnet - Powertrip
      "/songs/19",  // Clutch - Burning Beard
      "/songs/96",  // Wolfmother - Joker and the Thief
      "/songs/48",  // Kyuss - Green Machine
      "/songs/59"  // Monster Magnet - Negasonic Teenage Warhead
    ],
  },
  {
    id: 9,
    name: "Hits Anos 80",
    author: "/users/9",
    songs: [
      "/songs/71",  // Queen - Radio Ga Ga
      "/songs/1",  // ABBA - Dancing Queen
      "/songs/88",  // Tears for Fears - Shout
      "/songs/58",  // Michael Jackson - Thriller
      "/songs/80",  // Sisters of Mercy - Temple of Love
      "/songs/6",  // Billy Idol - Dancing with Myself
      "/songs/74",  // Rick Astley - Never Gonna Give You Up
      "/songs/86",  // Survivor - Eye of the Tiger
      "/songs/94",  // Van Halen - Jump
      "/songs/57",  // Michael Jackson - Beat It
      "/songs/42",  // Journey - Don't Stop Believin'
      "/songs/10",  // Bonnie Tyler - Holding Out for a Hero
      "/songs/17",  // The Clash - Should I Stay or Should I Go
      "/songs/35",  // Guns 'N Roses - Sweet Child O' Mine
      "/songs/87",  // Tears for Fears - Head Over Heels
      "/songs/8",  // Bon Jovi - Livin' On A Prayer
      "/songs/24"  // Dead or Alive - You Spin Me Round (Like a Record)
    ],
  },
];

const users = [
  new User(
    1,
    "usuario_1",
    "123456",
    "José",
    "Fernando",
    "98478-7786",
    "josefernando@teste.com"
  ),
  new User(
    2,
    "usuario_2",
    "123456",
    "Maria",
    "Cristina",
    "96778-7895",
    "mariacristina@teste.com"
  ),
  new User(
    3,
    "usuario_3",
    "123456",
    "Mario",
    "José",
    "98125-7741",
    "mariojose@teste.com"
  ),
  new User(
    4,
    "usuario_4",
    "123456",
    "Alice",
    "Sousa",
    "98591-2831",
    "alice@teste.com"
  ),
  new User(
    5,
    "usuario_5",
    "123456",
    "Leonardo",
    "Pires",
    "98255-6586",
    "leonardopires@teste.com"
  ),
  new User(
    6,
    "usuario_6",
    "123456",
    "Claudia",
    "Freitas",
    "98442-2233",
    "claudiafreitaso@teste.com"
  ),
  new User(
    7,
    "usuario_7",
    "123456",
    "Maria",
    "Luiza",
    "98258-3698",
    "malu@teste.com"
  ),
  new User(
    8,
    "usuario_8",
    "123456",
    "Eduardo",
    "Rodrigues",
    "94563-2597",
    "eduardorodrigues@teste.com"
  ),
  new User(
    9,
    "usuario_9",
    "123456",
    "Carolina",
    "Freitas",
    "91234-4321",
    "carolinafreitas@teste.com"
  ),
  new User(
    10,
    "usuario_10",
    "123456",
    "Beatriz",
    "Soares",
    "98010-2022",
    "beatrizsoares@teste.com"
  ),
];

const error = {
  caption: '<b><span style="color: #ff0000;">ERRO:</span></b> ',
  message: {
    artists: ["Artista especificado não encontrado."],
    playlists: ["Playlist não encontrada.", "Não há playlists disponíveis."],
    songs: ["Música não encontrada.", "Não há músicas disponíveis."],
    username: ["Já há um usuário registrado com o nome de usuário especificado."],
    users: ["Usuário não encontrado.", "Não há usuários disponíveis."],

    alertOnMissingAttributes(str) {
      return `Atributos insuficientes para a criação de uma nova ${str}.`
    }
  },
  
};

module.exports = { error, playlists, songs, users };