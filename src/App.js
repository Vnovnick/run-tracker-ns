import logo from './logo.svg';
import './App.css';
import PostFeed from './Components/PostFeed/PostFeed';
import reAuthorize from './util/auth';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <a href=''>Log in</a> */}
      </header>
      {/* {reAuthorize()} */}
      <PostFeed />
    </div>
  );
}

export default App;
