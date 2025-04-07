import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LightDarkMode from './LightDarkMode'
import SpotifyPodcastSearch from './Ref'
import axios from 'axios'
import HorizontalCardSlider from './cards'

function App() {

  // return(
  //   <>
  //   <SpotifyPodcastSearch/>
  //   </>
  // )

  const CLIENT_ID = 'a98215cdd8cd45cbb7bf027e1930ad70';
  const CLIENT_SECRET = '41ebac71008d499c88e0dfa1eab0d0ed';

  const [darkMode, setdarkMode] = useState(false);

  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const [podcasts, setPodcasts] = useState([]);


  useEffect(() => {

    const fetchToken = async () => {
      try {
        const response = await axios.post('https://accounts.spotify.com/api/token',
          'grant_type=client_credentials',
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
            }
          }
        )
        setToken(response.data.access_token);
        console.log(response.data.access_token)
      }
      catch (error) {
        console.error('Error fetching token', error);
      }
    }
    fetchToken();
  }, [])


  const searchPod = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.get(`https://api.spotify.com/v1/search?q=${search}&type=show`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        }
      )
      setPodcasts(response.data.shows.items);
      console.log(response.data.shows.items)
    }
    catch (error) {
      console.error('Error searching podcasts', error);
    }
  }

  return (
    <>
      <div className={`${darkMode ? "dark" : ""}`}>
        <button className="absolute top-4 right-4 p-2 bg-gray-300 dark:bg-gray-600 rounded-full transform transition duration-200 ease-in-out hover:scale-110" onClick={() => setdarkMode(!darkMode)}>
          {darkMode ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>}

        </button>
        <div className='flex flex-col w-screen min-h-screen bg-white dark:bg-gray-900'>
          <div className='mt-40 md:mt-50 lg:mt-60 flex flex-row justify-center items-center'>
            <h1 className="text-4xl font-extrabold md:text-6xl lg:text-7xl text-lime-900 dark:text-slate-200">Pod</h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-lime-600">fans</h1>
          </div>

          <form onSubmit={searchPod} className="mb-12 lg:mb-28 w-full max-w-lg  mx-auto p-4">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>

            <div className="relative">
              {/* Search Input */}
              <input onChange={(e) => { setSearch(e.target.value) }}
                type="search"
                id="default-search"
                value={search}
                className="block w-full p-4  pr-28 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="What would you like to listen to..."
                required
              />

              {/* Search Button */}
              <button
                type="submit"
                className="text-white rounded-full absolute right-2 bottom-2 bg-slate-400 hover:bg-green-600 focus:outline-none font-medium text-sm px-3 py-3 dark:bg-green-600 dark:hover:bg-green-700 transform transition duration-200 ease-in-out hover:scale-110"
              >
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </button>
            </div>
          </form>
          {podcasts.length > 0 && <div>
            <h1 className="relative inline-block text-xl lg:text-3xl lg:mb-3 mx-6 mb-2 lg:mx-11 font-semibold text-gray-900 dark:text-slate-200">Discovered Podcasts
              <span className="mx-[1px] lg:mx-[2px] lg:mt-1  block w-3/5 rounded-lg border-b-4 border-green-500 "></span>
            </h1>
            <div className='overflow-x-scroll mx-5 lg:mx-10 '>
              <HorizontalCardSlider cards={podcasts}></HorizontalCardSlider>
            </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default App
