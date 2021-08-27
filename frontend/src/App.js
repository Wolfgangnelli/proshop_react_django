import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
