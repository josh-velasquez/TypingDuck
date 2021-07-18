import assets from 'assets/rubber-du';
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="ui stackable menu">
        <div class="item">
          <img src="assets/rubber-duck.png" />
        </div>
        <a class="item">Features</a>
        <a class="item">Testimonials</a>
        <a class="item">Sign-in</a>
      </div>
    </div>
  );
}

export default App;
