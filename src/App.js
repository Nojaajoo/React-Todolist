import {useState} from "react";
import Header from "./Header";
import './App.css';
import List from "./List";

const URL = "http://localhost/todolist/";



function App() {
  const [searchCriteria, setSearchCriteria] = useState(null);

  function search(criteria) {
   // console.log(criteria);
    setSearchCriteria(criteria);
  }

  return (
    <>
      <Header search={search} />
      <List URL={URL} criteria={searchCriteria}/>
    </>
  );
}

export default App;