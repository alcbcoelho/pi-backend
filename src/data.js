class User {
  constructor(id, username, password, firstName, lastName, phone, email)
  {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
  }
}

const songs = [
  { name: "Dancing Queen", artist: "ABBA" },
  { name: "Highway to Hell", artist: "AC/DC" },
  { name: "Thunderstruck", artist: "AC/DC" },
  { name: "Man in the Box", artist: "Alice in Chains" },
  { name: "Them Bones", artist: "Alice in Chains" },
  { name: "Dancing with Myself", artist: "Billy Idol" },
  { name: "White Wedding", artist: "Billy Idol" },
  { name: "Livin' On A Prayer", artist: "Bon Jovi" },
  { name: "You Give Love a Bad Name", artist: "Bon Jovi" },
  { name: "Holding Out for a Hero", artist: "Bonnie Tyler" },
  { name: "Breadfan", artist: "Budgie" },
  { name: "Heaven and Hell", artist: "Black Sabbath" },
  { name: "Iron Man", artist: "Black Sabbath" },
  { name: "Sabbra Cadabra", artist: "Black Sabbath" },
  { name: "London Calling", artist: "The Clash" },
  { name: "Should I Stay or Should I Go", artist: "The Clash" },
  { name: "White Riot", artist: "The Clash" },
  { name: "Burning Beard", artist: "Clutch" },
  { name: "Power Player", artist: "Clutch" },
  { name: "Holiday In Cambodia", artist: "Dead Kennedys" },
  { name: "You Spin Me Round (Like a Record)", artist: "Dead or Alive" },
  { name: "Layla", artist: "Derek & the Dominos" },
  { name: "Highway Star", artist: "Deep Purple" },
  { name: "Hush", artist: "Deep Purple" },
  { name: "Money For Nothing", artist: "Dire Straits" },
  { name: "Sultans of Swing", artist: "Dire Straits" },
  { name: "Riders on the Storm", artist: "The Doors" },
  { name: "Layla", artist: "Eric Clapton" },
  { name: "Tears in Heaven", artist: "Eric Clapton" },
  { name: "Epic", artist: "Faith No More" },
  { name: "Welcome to the Jungle", artist: "Guns 'N Roses" },
  { name: "Sweet Child O' Mine", artist: "Guns 'N Roses" },
  { name: "What Is Love", artist: "Haddaway" }, // Queen - We Are the Champions ? Europe - The Final Countdown
  { name: "The Trooper", artist: "Iron Maiden" },
  { name: "Wasted Years", artist: "Iron Maiden" },
  { name: "Hey Joe", artist: "Jimi Hendrix" },
  { name: "Hungarian Dance No. 5", artist: "Johannes Brahms" },
  {
    name: "Toccata and Fugue in D minor, BWV 565",
    artist: "Johann Sebastian Bach",
  },
  { name: "Don't Stop Believin'", artist: "Journey" },
  { name: "Electric Eye", artist: "Judas Priest" },
  { name: "Victim of Changes", artist: "Judas Priest" },
  { name: "21st Century Schizoid Man", artist: "King Crimson" },
  { name: "Starless", artist: "King Crimson" },
  { name: "Gardenia", artist: "Kyuss" },
  { name: "Green Machine", artist: "Kyuss" },
  { name: "Stairway to Heaven", artist: "Led Zeppelin" },
  { name: "Free Bird", artist: "Lynyrd Skynyrd" },
  { name: "Piano Sonata No. 14", artist: "Ludwig van Beethoven" },
  { name: "Symphony No. 5", artist: "Ludwig van Beethoven" },
  { name: "Holy Wars... the Punishment Due", artist: "Megadeth" },
  { name: "Peace Sells", artist: "Megadeth" },
  { name: "Enter Sandman", artist: "Metallica" },
  { name: "Master of Puppets", artist: "Metallica" },
  { name: "Beat It", artist: "Michael Jackson" },
  { name: "Don't Stop 'Til You Get Enough", artist: "Michael Jackson" },  //
  { name: "Thriller", artist: "Michael Jackson" },
  { name: "Negasonic Teenage Warhead", artist: "Monster Magnet" },
  { name: "Powertrip", artist: "Monster Magnet" },
  { name: "Dr. Feelgood", artist: "Mötley Crüe" },
  { name: "Ace of Spades", artist: "Motörhead" },
  { name: "Smells Like Teen Spirit", artist: "Nirvana" },
  { name: "Cowboys from Hell", artist: "Pantera" },
  { name: "Even Flow", artist: "Pearl Jam" },
  { name: "Jeremy", artist: "Pearl Jam" },
  { name: "Time", artist: "Pink Floyd" },
  { name: "1892 Overture", artist: "Pyotr Tchaikovsky" },
  { name: "Bohemian Rhapsody", artist: "Queen" },
  { name: "Radio Ga Ga", artist: "Queen" },
  { name: "I Wanna Be Sedated", artist: "Ramones" },
  { name: "Poison Heart", artist: "Ramones" },  //
  { name: "Ride of the Valkyries", artist: "Richard Wagner" },
  { name: "Never Gonna Give You Up", artist: "Rick Astley" },
  { name: "The Spirit of Radio", artist: "Rush" },
  { name: "Subdivisions", artist: "Rush" },
  { name: "YYZ", artist: "Rush" },
  { name: "Anarchy In The UK", artist: "Sex Pistols" },
  { name: "God Save The Queen", artist: "Sex Pistols" },
  { name: "More", artist: "Sisters of Mercy" }, //
  { name: "Temple of Love", artist: "Sisters of Mercy" },
  { name: "Bullet with Butterfly Wings", artist: "Smashing Pumpkins" },
  { name: "Born To Be Wild", artist: "Steppenwolf" },
  { name: "Interstate Love Song", artist: "Stone Temple Pilots" },
  { name: "Institutionalized", artist: "Suicidal Tendencies" },
  { name: "Hide In Your Shell", artist: "Supertramp" },
  { name: "Eye of the Tiger", artist: "Survivor" },
  { name: "Heads Over Heels", artist: "Tears for Fears" },
  { name: "Shout", artist: "Tears for Fears" },
  { name: "Jailbreak", artist: "Thin Lizzy" },
  { name: "The Boys Are Back In Town", artist: "Thin Lizzy" },
  { name: "Black No. 1", artist: "Type O Negative" },
  { name: "Love You to Death", artist: "Type O Negative" },
  { name: "Rock Bottom", artist: "UFO" },
  { name: "Salisbury", artist: "Uriah Heep" },
  { name: "Eruption", artist: "Van Halen" },  // Van Halen - Jump ? Scorpions - Rock You Like a Hurricane
  { name: "Panama", artist: "Van Halen" },
  { name: "Joker And The Thief", artist: "Wolfmother" },
  { name: "New Moon Rising", artist: "Wolfmother" },
  { name: "Roundabout", artist: "Yes" },
  { name: "La Grange", artist: "ZZ Top" },
  { name: "Sharp Dressed Man", artist: "ZZ Top" },
];

const playlists = [];

const users = [
  new User(1, "u1", "123456", "José", "Fernando", "98478-7786", "josefernando@teste.com")
];

const error = {
  caption: '<b><span style="color: #ff0000;">ERRO:</span></b> ',
  message: {
    artists: ["Artista especificado não encontrado."],
    playlists: ["Playlist não encontrada.", "Não há playlists disponíveis."],
    songs: ["Música não encontrada.", "Não há músicas disponíveis."],
    users: ["Usuário não encontrado.", "Não há usuários disponíveis."],
  },
};

module.exports = { User, error, playlists, songs, users };

/* 
const usuarios = [
  {
    id: 1,
    username: "u1",
    FirstName: "José",
    lastName: "Fernando",
    password: "123456",
    phone: "98478-7786",
    email: "josefernando@teste.com",
  },
  {
    id: 2,
    username: "u2",
    FirstName: "Maria",
    lastName: "Cristina",
    password: "123456",
    phone: "96778-7895",
    email: "mariacristina@teste.com",
  },
  {
    id: 3,
    username: "u3",
    FirstName: "Mario",
    lastName: "José",
    password: "123456",
    phone: "98125-7741",
    email: "mariojose@teste.com",
  },
  {
    id: 4,
    username: "u4",
    FirstName: "Alice",
    lastName: "Sousa",
    password: "123456",
    phone: "98591-2831",
    email: "alice@teste.com",
  },
  {
    id: 5,
    username: "u5",
    FirstName: "Leonardo",
    lastName: "Pires",
    password: "123456",
    phone: "98255-6586",
    email: "leonardopires@teste.com",
  },
  {
    id: 6,
    username: "u6",
    FirstName: "Claudia",
    lastName: "Freitas",
    password: "123456",
    phone: "98442-2233",
    email: "claudiafreitaso@teste.com",
  },
  {
    id: 7,
    username: "u7",
    FirstName: "Maria",
    lastName: "Luiza",
    password: "123456",
    phone: "98258-3698",
    email: "malu@teste.com",
  },
  {
    id: 8,
    username: "u8",
    FirstName: "Eduardo",
    lastName: "Rodrigues",
    password: "123456",
    phone: "94563-2597",
    email: "eduardorodrigues@teste.com",
  },
  {
    id: 9,
    username: "u9",
    FirstName: "Carolina",
    lastName: "Freitas",
    password: "123456",
    phone: "91234-4321",
    email: "carolinafreitas@teste.com",
  },
  {
    id: 10,
    username: "u10",
    FirstName: "Beatriz",
    lastName: "Soares",
    password: "123456",
    phone: "98010-2022",
    email: "beatrizsoares@teste.com",
  },
];
 */