// useEffect and useState are hooks in React. useState is used for managing the component's state, and useEffect allows handling side effects (such as API calls).
import { useEffect, useState } from "react";

// The App is the main component that contains all the application's logic and rendering.
function App() {
  // error: Stores any error messages during API calls.
  const [error, setError] = useState(null);

  // searchTerm: Stores the search term entered by the user.
  const [searchTerm, setSearchTerm] = useState("");

  // filteredUsers: Stores the fetched users that match the search term.
  const [filteredUsers, setFilteredUsers] = useState([]);

  // debounceTimeout: Used to manage debouncing to prevent making API calls too frequently.
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Defines the GitHub API endpoint used for fetching users.
  const API_URL = "https://api.github.com";

  // Asynchronous function fetches users from the GitHub API based on the given search term.
  const fetchUsers = async (query) => {
    // If the search term is empty, it clears the filteredUsers state.
    if (!query) {
      setFilteredUsers([]);
      return;
    }

    // Await pauses execution until the API call is complete, allowing for error handling and storage of the fetched users afterward.
    try {
      const response = await fetch(`${API_URL}/search/users?q=${query}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`Error: ${errorData.message}`);
      }
      const data = await response.json();
      setFilteredUsers(data.items || []);
    } catch (error) {
      console.error("Users not found", error);
      setError("Failed to load users: " + error.message);
    }
  };
  // useEffect hook calls the fetchUsers function when the component is first rendered. Since the dependency array is empty, it calls the function only once.
  useEffect(() => {
    fetchUsers();
  }, []);

  // This function handles the user's input from the search field. It updates the searchTerm state and checks if the input is long enough (at least 3 characters) before making the API call.
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length < 3) {
      setFilteredUsers([]);
      return;
    }
    // The debounce function prevents making API calls too quickly in succession.
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      fetchUsers(value);
    }, 300);

    setDebounceTimeout(timeout);
  };

  // This function calls the fetchUsers function when the user clicks the search button.
  const handleButtonClick = () => {
    fetchUsers(searchTerm);
  };

  // The component renders the search field, search button, and the fetched users. If the error state is set, it displays an error message.
  return (
    <>
      <main>
        <h2>Project 5: Github User Search</h2>
        {error && <p>{error}</p>}
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter username or email"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={handleButtonClick}>Search</button>
        </div>
        <h3>Results</h3>
        {filteredUsers.map((user) => (
          <div className="user-container" key={user.id}>
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              width="50"
              height="50"
            />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.login}
            </a>
          </div>
        ))}
      </main>
    </>
  );
}

export default App;
