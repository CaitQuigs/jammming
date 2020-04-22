let accessToken = '';
let expiresIn = '';
const clientId = `56bc82e7cd914969b62dea80bea6b85d`;
const redirectURI = `http://localhost:3000/`;
const authEndpoint = `https://accounts.spotify.com/authorize`;
const scopes = [
	"playlist-modify-private",
	"playlist-modify-public",
	"playlist-read-private"
];
const accessTokenRegex = '/access_token=([^&]*)/'
const expiresInRegex = '/expires_in=([^&]*)/'

const Spotify = {
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		} else if (window.location.href.match(accessTokenRegex)) {
			accessToken = window.location.href.match(accessTokenRegex)[1];
			expiresIn = window.location.href.match(expiresInRegex)[1];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			window.location = `${authEndpoint}?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectURI}`;
		}
	},

	search(term) {
		this.getAccessToken();
		fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
		).then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error('Request failed!');
		}, networkError => console.log(networkError.message)
		).then(jsonResponse => {
			let tracks = [];
			if (jsonResponse.tracks.items.length > 0) {
				tracks = jsonResponse.tracks.items.map((track) => {
					return {
						id: track.id,
						name: track.name,
						artist: track.artists[0].name,
						album: track.album.name,
						uri: track.uri
					};
				})
				console.log(tracks);
				return tracks;
			} else {
				return "No Results Found. Please try again";
			}
		});
	}
}

export default Spotify;