import { BrowserRouter,Routes,Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Wallet from './component/wallet';
import Login from './component/login';
import './App.css';

function App() {
  return (
     <div className="App">
     <BrowserRouter>
      <Routes>
      <Route path="/" element= { <Login/>} />
      <Route path="/login" element= { <Login/>} />
      <Route path="/user" element= { <Wallet/>} />
    </Routes>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
         />
     </BrowserRouter>
     </div>
  );
}

export default App;
