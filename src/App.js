
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const dummmtData = [{
  id : 1,
  title : "anything",
  opening_crawl : "this is a movie about the girl who doesnot know anything",
  release_date: " 2020-11-12"
},
{
  id : 2,
  title : "anything",
  opening_crawl : "this is a movie about the girl who doesnot know anything",
  release_date: " 2020-11-12"
}]

function App() {
const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [retryInterval, setRetryInterval] = useState(null);
  const [episodeId, setEpisodeId] = useState('');
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [director, setDirector] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://swapi.dev/api/films');
      setFilms(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      retryFetch();
    }
  };

  const retryFetch = () => {
    setLoading(true);
    setRetrying(true);
    setRetryInterval(setInterval(fetchData, 5000));
  };

  const cancelRetry = () => {
    setLoading(false);
    setRetrying(false);
    clearInterval(retryInterval); 
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handlePost = async () => {
    try {
      const response = await axios.post('https://swapi.dev/api/films', {
        episode_id: episodeId,
        title,
        release_date: releaseDate,
        director,
      });
      console.log('POST response:', response.data);
      // Optionally, you can clear the input fields after a successful post
      setEpisodeId('');
      setTitle('');
      setReleaseDate('');
      setDirector('');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://your-api-endpoint.com/delete/${id}`);
      console.log(`Deleted item with ID: ${id}`);
      fetchData(); // Refresh the list after a successful delete
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  return (
    <div className="App">
      <div className='container'>
      <button onClick={retrying ? cancelRetry : retryFetch}>
          {retrying ? 'Cancel Retry' : 'Retry fetching data'}
        </button>
        <div>
          <input
            type="number"
            placeholder="Episode ID"
            value={episodeId}
            onChange={(e) => setEpisodeId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            placeholder="Release Date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
          <button onClick={handlePost}>Post Data</button>
        </div>
        {loading ? (
          <ul>
            <li>
              <h3>{retrying ? 'Retrying...' : 'Loading...'}</h3>
            </li>
          </ul>
        ) : (
          <ul>
            {films.map((film) => (
              <li key={film.episode_id}>
                <h2>{film.title}</h2>
                <p>Director: {film.director}</p>
                <p>Release Date: {film.release_date}</p>
                <button onClick={() => handleDelete(film.episode_id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
    </div>
    </div>
  );
}

export default App;
