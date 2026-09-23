import { useEffect, useState } from 'react'
import './App.css'

function hello() {
  return <h1>Halo, saya fullstack developer</h1>
}

function nama(props){
  return <h1>halo,nama saya adalah {props.nama}. saya adalah seorang {props.title}</h1>
}

function nama2({ nama, title}) {
  return <h1>halo,nama saya adalah {nama}. saya adalah seorang {title}</h1>
}





function App() {
  const[angka, setAngka] = useState(5);

  // useEffect(()=>{
  //   console.log("halo");
  // })

  useEffect(()=>{
    console.log("Angka: " + angka);
  },[angka])

return (
  <div>
    {/* <h1>Hello World</h1>
    {hello()}
    {nama({ nama: "gyen", title: "web developer"})}
    {nama({ nama: "syofi",title: "UI/UX"})} */}
    {angka}
    <div>
      {/* <button onClick={()=> setAngka(10)}>Tambah</button> */}
      <button onClick={()=> setAngka(angka + 1)}>Tambah</button>

      <button onClick={()=> setAngka(angka - 1)}>Kurang</button>
    </div>
  </div>
    
);
}

export default App
