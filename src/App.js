import { useState, useCallback } from "react";
import { Mention, MentionsInput } from "react-mentions";
import mentionStyle from "./mentionStyle";
import mentionsInputStyle from "./mentionsInputStyle";

function App() {
  const [value, setValue] = useState("");
  const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/;

  const users = [
    {
      id: "isaac",
      display: "Isaac Newton",
    },
    {
      id: "sam",
      display: "Sam Victor",
    },
    {
      id: "emma",
      display: "emmanuel@nobody.com",
    },
  ];

  function fetchUsers(query, callback) {
    if (!query) return;
    fetch(`https://jsonplaceholder.typicode.com/users?q=${query}`, {
      json: true,
    })
      .then((res) => res.json())

      // Transform the users to what react-mentions expects
      .then((res) => 
        res.map((user) => ({ display: user.username, id: user.name }))
      )
      
      .then(callback);
  }


  return (
    <div className="App">

      {/* Working with Default mentions */}

      <h2>Default Mentions Input</h2>
      <MentionsInput
        style={mentionsInputStyle}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <Mention style={mentionStyle} data={users} />
      </MentionsInput>
      <br />
      <br />
      <br />

      <h2>Using a Single line Input</h2>
      <MentionsInput
        singleLine
        style={mentionsInputStyle}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <Mention style={mentionStyle} data={users} />
      </MentionsInput>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h2>Using Multiple Trigger pattern</h2>
      <MentionsInput
        style={mentionsInputStyle}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <Mention style={mentionStyle} data={users} />

        <Mention
          trigger={emailRegex}
          data={(search) => [{ id: search, display: search }]}
          onAdd={useCallback((...args) => {
            console.log(...args);
          }, [])}
          style={{ backgroundColor: "#d1c4e9" }}
        />
      </MentionsInput>

      <h2>Displaying ID</h2>
      <MentionsInput
        style={mentionsInputStyle}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <Mention
          displayTransform={(id) => `<!--${id}-->`}
          style={mentionStyle}
          data={users}
        />
      </MentionsInput>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* Working with external data */}
      <h2>Fetching response from external sources</h2>

      <MentionsInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={mentionsInputStyle}
        placeholder="Mention any JsonPlaceholder username by typing `@` followed by at least one character"
        a11ySuggestionsListLabel={"Suggested JsonPlaceholder username for mention"}
      >
        <Mention
          displayTransform={(id) => `@${id}`}
          trigger="@"
          data={fetchUsers}
          style={mentionStyle}
        />
      </MentionsInput>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
