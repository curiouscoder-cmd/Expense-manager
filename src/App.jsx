import { useState, useEffect } from 'react'
import './App.css'
import PocketBase from 'pocketbase';

function App() {
  const [record, setRecord] = useState([])
  const pb = new PocketBase('http://127.0.0.1:8090');

  useEffect(() => {
    try{
    const fetchData = async () => {
      const records = await pb.collection('categories').getFullList();
      // console.log(records);
      setRecord(records);
    }

    fetchData()
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  },[])


  return (
    <>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        {record.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td style={{ backgroundColor: item.color }}>{item.color}</td>
          </tr>
        ))}
      </tbody>
    </table>
      
    </>
  )
}

export default App
