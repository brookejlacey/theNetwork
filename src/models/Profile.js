
export class Profile {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    this.class = data.class
    this.graduated = data.graduated
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  
  }
}

// let data = {
//   "_id": "653955ee270c9d4bb743829b",
//   "subs": [
//     "auth0|653955ed24ee6ee2b5f99de3"
//   ],
//   "email": "neonblizzard@twitch.tv",
//   "name": "Neon Blizzard",
//   "picture": "https://media.tenor.com/OTvrvx1CQfwAAAAC/azuki-ashchild.gif",
//   "bio": 
//   "coverImg": "",
//   "github": "https://github.com/blizzard",
//   "linkedin": "https://linkedin.com",
//   "resume": "https://linkedin.com",
//   "class": "Summer 23'",
//   "graduated": true,
//   "createdAt": "2023-10-25T17:52:55.787Z",
//   "updatedAt": "2023-10-30T15:42:57.347Z",
//   "__v": 0,
//   "id": "653955ee270c9d4bb743829b"
// }