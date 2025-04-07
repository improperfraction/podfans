

import { useState, useEffect } from 'react';
import axios from 'axios';

function SpotifyPodcastSearch() {
    const CLIENT_ID = 'a98215cdd8cd45cbb7bf027e1930ad70';
    const CLIENT_SECRET = '41ebac71008d499c88e0dfa1eab0d0ed';
    const [accessToken, setAccessToken] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [podcasts, setPodcasts] = useState([]);

    // Fetch Access Token
    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await axios.post('https://accounts.spotify.com/api/token',
                    'grant_type=client_credentials',
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
                        },
                    }
                );
                setAccessToken(response.data.access_token);
            } catch (error) {
                console.error('Error fetching token', error);
            }
        };
        getToken();
    }, []);

    // Fetch Podcasts
    const searchPodcasts = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=show`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            });
            setPodcasts(response.data.shows.items);
        } catch (error) {
            console.error('Error searching podcasts', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mt-8">Spotify Podcast Search</h1>
            <form onSubmit={searchPodcasts} className="mt-4">
                <input
                    type="text"
                    placeholder="Search for podcasts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 rounded-md bg-gray-800 text-white mr-2"
                />
                <button type="submit" className="bg-green-500 p-2 rounded-md">Search</button>
            </form>
            <div className="mt-6 space-y-4">
                {podcasts.map((podcast) => (
                    <div key={podcast.id} className="p-4 bg-gray-800 rounded-lg">
                        <img src={podcast.images[0]?.url} alt={podcast.name} className="w-32 h-32 rounded-md mb-2" />
                        <h2 className="text-xl font-bold">{podcast.name}</h2>
                        <p className="text-sm text-gray-400">{podcast.publisher}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SpotifyPodcastSearch;
