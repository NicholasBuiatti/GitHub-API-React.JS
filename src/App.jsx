import Header from './components/Header'
import List from './components/List'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  // CREO CON LO USESTATE UNO STATO
  const [user, setUser] = useState([])
  // const [languages, setLanguages] = useState([]);

  // useEffect(() => {
  //   // Funzione per ottenere i dati dall'API
  //   const callLanguages = async () => {
  //     try {
  //       const response = await axios.get('https://api.github.com/languages');
  //       setLanguages(response.data); // Imposta lo stato con i dati ricevuti
  //     } catch (error) {
  //       console.error('Errore durante il fetch dei linguaggi:', error);
  //     }
  //   };
  //   console.log(languages);

  // }, []);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <List user={user} />
      {/* <pre>{JSON.stringify(languages, null, 2)}</pre> */}
    </>
  )
}
export default App
