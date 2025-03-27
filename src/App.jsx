import { useEffect, useState } from "react";

function App() {
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const API_URL = "https://api.github.com";

  const fetchUsers = async (query = "") => {
    try {
      const response = await fetch(`${API_URL}/search/users?q=${query}`);
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
      const data = await response.json();
      console.log(data);
      setFilteredUsers(data.items || []);
    } catch (error) {
      console.error("Users not found", error);
      setError("Failed to load users: " + error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    fetchUsers(searchTerm);
  };

  return (
    <>
      <div className="main">
        <h2>Project 5: Github User Search</h2>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Enter username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <h3>results</h3>
        {filteredUsers.map((user) => (
          <div className="user-container" key={user.id}>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.login}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
