
import CountryList from './Components/CountryList';
import Navbar from './Components/Navbar';
import { Helmet } from "react-helmet";
function App() {
  return (
    <>
      <Helmet>
        <title>Country Filter</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Navbar />
      <CountryList />
    </>
  );
}

export default App;
