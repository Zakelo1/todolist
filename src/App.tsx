import { Routes, Route } from 'react-router-dom'; 
import Hometodolist from './Hometodolist';  
import History from './History';  
import Editer from './Editer'
import Complete from './Complete';
import Account from './Account'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hometodolist />} />  
      <Route path="/History" element={<History />} />  
      <Route path='/editer' element={<Editer/>} />
      <Route path='/complete' element={<Complete/>} />
      <Route path='/account' element={<Account/>} />
    </Routes>
  );
};

export default App;
