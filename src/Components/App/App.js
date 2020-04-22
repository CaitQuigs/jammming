import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        id: 1,
        name: 'Giving Up the Gun',
        artist: 'Vampire Weekend',
        album: 'Contra'
      }, {
        id: 2,
        name: 'Lisztomania',
        artist: 'Phoenix',
        album: 'Wolfgang Amadeus Phoenix'
      }, {
        id: 3,
        name: 'Where Is My Mind?',
        artist: 'Pixies',
        album: 'Surfer Rosa'
      }],
      playlistName: 'Demo Playlist',
      playlistTracks: [{
        id: 4,
        name: 'Skinny Love',
        artist: 'Bon Iver',
        album: 'For Emma, Forever Ago'
      }, {
        id: 5,
        name: 'The River of Dreams',
        artist: 'Billy Joel',
        album: 'River of Dreams'
      }, {
        id: 6,
        name: 'I Wanna Dance With Somebody',
        artist: 'Whitney Houston',
        album: 'Whitney'
      }, {
        id: 7,
        name: 'Take On Me',
        artist: 'a-ha',
        album: 'Hunting High and Low'
      }]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

  // addTrack method adds a track to the tracklist when the + sign button is clicked
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return 'This song is already in the playlist';
    } else {
      this.setState((state) => {
        const list = this.state.playlistTracks.concat(track);
        return {
          playlistTracks: list
        }
      });
    }
  }

  // removeTrack method removes a tracklist when the - sign button is clicked
  removeTrack(track) {
    this.setState((state) => {
      const list = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
      return {
        playlistTracks: list
      }
    });
  }

  //updatePlaylistName will update the name of the Playlist. The playlist name is an input field, so it can be changed at any time.
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  search(term) {
    const tracks = Spotify.search(term);
    this.setState({
      searchResults: tracks
    });
    console.log(tracks);
  }

  savePlaylist() {
    const trackURIs = [];
    this.state.playlistTracks.map((track) => {
      return trackURIs.push(track.uri);
    });
    return trackURIs;
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
