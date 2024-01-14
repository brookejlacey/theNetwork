export class Ad {
  constructor(data) {
    this.title = data.title;
    this.linkURL = data.linkURL;
    this.tall = data.tall;
    this.square = data.square;
    this.banner = data.banner;
  }
}

let data = {
    title: "MusicisFun",
    linkURL: "boisecodeworks.com",
    tall: "https://codeworks.blob.core.windows.net/public/assets/ads/TallAdMusicisfun.png",
    square: "https://codeworks.blob.core.windows.net/public/assets/ads/SquareAdMusicisfun.png",
    banner: "https://codeworks.blob.core.windows.net/public/assets/ads/BannerAdMusicisfun.png"

}