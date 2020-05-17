import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles/styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadApi() {
      const response = await api.get("repositories");

      setRepositories(response.data);
    }

    loadApi();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Test repository from: ${new Date()}`,
      url: "http://github.com/",
      techs: ["React", "JavaScript", "HTML", "CSS"],
    };

    const newRepository = await api.post("repositories", repository);

    setRepositories([...repositories, newRepository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const deletedRepositories = repositories.filter((repository) => {
      return repository.id !== id;
    });

    setRepositories(deletedRepositories);
  }

  return (
    <div>
      <header>
        <h1>Local repositories API test</h1>
        <button onClick={handleAddRepository}>Adicionar</button>
      </header>

      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
