import { useState, useCallback, useEffect } from "react";
import { Mention, MentionsInput } from "react-mentions";
import mentionStyle from "./mentionStyle";
import merge from "lodash/merge";
import mentionsInputStyle from "./mentionsInputStyle";

import CustomForm from "./CustomForm";

function App() {
  const [value, setValue] = useState("");
  const [emojiValue, setEmojiValue] = useState([]);

  const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/;
  const notMatchingRegex = /($a)/;

  let customStyle = merge({}, mentionsInputStyle, {
    input: {
      overflow: "auto",
      height: 80,
      width: 500,
    },
    highlighter: {
      boxSizing: "border-box",
      overflow: "hidden",
      height: 80,
      width: 500,
    },
  });

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

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json"
    )
      .then((data) => {
        return data.json();
      })
      .then((jsonData) => {
        setEmojiValue(jsonData.emojis);
      });
  }, []);

  const queryEmojis = (query, callback) => {
    if (query.length === 0) return;

    const filterValue = emojiValue
      .filter((emoji) => {
        return emoji.name.indexOf(query.toLowerCase()) > -1;
      })
      .slice(0, 10);
    return filterValue.map(({ emoji }) => ({ id: emoji }));
  };

  return (
    <div className="App">
      {/* Working with Default mentions */}
   {/*   <h2>Lets get started</h2>
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
      // <br />
      // <br />
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>Scrollable Container</h2>
      <MentionsInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={customStyle}
        placeholder={"Mention people using '@'"}
        a11ySuggestionsListLabel={"Suggested mentions"}
      >
        <Mention trigger="@" data={users} style={mentionStyle} />
      </MentionsInput>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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
     {/* <h2>Fetching response from external sources</h2>
      <MentionsInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={mentionsInputStyle}
        placeholder="Mention any JsonPlaceholder username by typing `@` followed by at least one character"
        a11ySuggestionsListLabel={
          "Suggested JsonPlaceholder username for mention"
        }
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
      <h3>Emoji support</h3>
      <MentionsInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={mentionsInputStyle}
        placeholder={"Press '&' for emojis, mention people using '@'"}
      >
        <Mention
          trigger="@"
          displayTransform={(username) => `@${username}`}
          markup="@__id__"
          data={users}
          regex={/@(\S+)/}
          style={mentionStyle}
          appendSpaceOnAdd
        />
        <Mention
          trigger="&"
          markup="__id__"
          regex={notMatchingRegex}
          data={queryEmojis}
        />
      </MentionsInput>
      <br />
      <br />
      <br />
      <br />*/}


      <CustomForm/>
    </div>
  );
}

export default App;
