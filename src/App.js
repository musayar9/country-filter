import CountryList from './Components/CountryList';
import Navbar from './Components/Navbar';
import { Helmet } from "react-helmet";
function App() {
  return (
    <>
      <Helmet>
        <title> Country Currency Filter</title>
        <meta name="description" content="currency-filter" />
      </Helmet>
      <Navbar />
      <CountryList />
    </>
  );
}

export default App;
