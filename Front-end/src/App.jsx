import './App.css'; 
import AllRoute from './components/AllRoute';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    AOS.init({
        duration: 1000,
        once: true, // quan trọng: cho phép lặp lại animation
    });
    }, []);
  return (
    <>
      <div className='font-sans'>
        <AllRoute/>
      </div>
    </>
  );
}

export default App;