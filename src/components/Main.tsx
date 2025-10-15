import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Menubar from './Menubar'
import Home from './Home'
import Footer from './Footer'
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth'; // Explicitly import 'User' as a type
import { auth } from "../firebase/setup"


const Main = () => {

  const [prod, setProd] = useState([])
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);



  // const getProducts = () => {
  //   fetch('https://fakestoreapi.com/products')
  //     .then(response => response.json())
  //     .then(data => setProd(data))
  //     // .then(data => console.log(data));
  // }
  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProd(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  useEffect(() => {
    getProducts()
  }, [])


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe(); 
  }, []);


  if (loading) {
    return <div>Loading authentication...</div>;
  }

  console.log(currentUser, ' logging users from ------> ')

  return (
    <div className='flex flex-col justify-between'>
      <div>
        <Navbar />
        <Menubar />
        <Home products={prod} />
      </div>
      <Footer />
    </div>
  )
}

export default Main
