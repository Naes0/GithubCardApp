import React, { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

const testData = [
  {
    id: 1,
    name: "Dan Abramov",
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "@facebook",
  },
  {
    id: 2,
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Humu",
  },
  {
    id: 3,
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Facebook",
  },
];

const CardList = (props) => {
  const { data } = props;
  return (
    <div>
      {data.map((profile) => (
        <Card key={profile.id} {...profile} />
      ))}
    </div>
  );
};

const Card = (props) => {
  const { name, company, avatar_url } = props;
  return (
    <div className='github-profile'>
      <img src={avatar_url} />
      <div className='info'>
        <div className='name'>{name}</div>
        <div className='company'>{company}</div>
      </div>
    </div>
  );
};

const Form = (props) => {
  const { onSubmit } = props;
  const [username, setUserName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get("https://api.github.com/users/" + username);
    onSubmit(resp.data);
    setUserName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(event) => setUserName(event.target.value)}
        type='text'
        placeholder='GitHub username'
        required
      />
      <button>Add card</button>
    </form>
  );
};

const App = (props) => {
  const { title } = props;
  const [profiles, setProfiles] = useState(testData);
  const addNewProfile = (newProfile) => {
    setProfiles([...testData, newProfile]);
  };

  return (
    <div>
      <div className='header'>{title}</div>
      <Form onSubmit={addNewProfile} />
      <CardList data={profiles} />
    </div>
  );
};

export default App;
