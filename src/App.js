import './App.css';
import  AppBar  from '@mui/material/AppBar';
import Toolbar  from '@mui/material/Toolbar';
import  Typography  from '@mui/material/Typography';
import Carlist from './components/CarList';
import Caroussel from './components/Caroussel';
import { green } from '@mui/material/colors';
function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography style={{
            fontSize:"20px"
          }} variant="h6">
            Blue Carshop
          </Typography>
        </Toolbar>
      </AppBar>
      <Caroussel/>
      <Carlist/>

    </div>
  );
}

export default App;