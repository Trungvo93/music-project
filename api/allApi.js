const URL = "https://api-kaito-music.vercel.app/api";
export const urlTrending = `${URL}/music/trending`;
export const urlHitSong = `${URL}/search?query=pop`;
export const urlNewMusic = `${URL}/music/new-music`;
export const urlPopViet = `${URL}/search?query=nhac-tre`;
export const urlRemix = `${URL}/search?query=remix`;
export const urlChill = `${URL}/search?query=chill`;
export const urlKpop = `${URL}/search?query=nhac-han`;
export const urlVpop = `${URL}/search?query=v-pop`;
export const urlSoSad = `${URL}/search?query=nhac-buon`;
export const urlHoQuangHieu = `${URL}/search?query=ho-quang-hieu`;
export const urlSonTung = `${URL}/search?query=son-tung`;
export const urlPhanManhQuynh = `${URL}/search?query=phan-manh-quynh`;
export const urlBichPhuong = `${URL}/search?query=bich-phuong`;
export const urlTangPhuc = `${URL}/search?query=tang-phuc`;
export const urlTopViews = `${URL}/music/top-views?_limit=249`;
export const urlSearch = `${URL}/search`;

//Account
export const urlLogin = `${URL}/account/login`;
export const urlProfile = `${URL}/account/profile`;
export const urlRegister = `${URL}/account/register`;

//User Play List
export const urlCreatePlaylist = `${URL}/list-music/create`;
export const urlGetAllPlaylist = `${URL}/list-music/get-list`;
export const urlGetPlaylist = `${URL}/list-music/get-by-id`;
export const urlDeletePlaylist = `${URL}/list-music/delete-list-music`;
export const urlChangeNamePlaylist = `${URL}/list-music/update-name-list-music`;
export const urlAddItemPlaylist = `${URL}/list-music/add-list-music`;

//Favourite music
export const urlFavoriteMusic = `${URL}/favorite/get-authorization-token`;
export const urlAddFavorite = `${URL}/favorite/create`;
export const urlDeleteFavorite = `${URL}/favorite/create`;
