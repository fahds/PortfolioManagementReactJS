import React from 'react';
import api from './services/api';

import './styles.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((resp) => setRepos(resp.data));
  }, []);

  async function handleAddRepository() {
    const repo = await api.post('/repositories', {
      title: `Nível ${Date.now()}`,
      url: `http://github.com/fahds/${Date.now()}`,
      techs: ['1', '2'],
    });
    setRepos([...repos, repo.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepos([...repos.filter((repo) => repo.id !== id)]);
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid='repository-list'>
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
