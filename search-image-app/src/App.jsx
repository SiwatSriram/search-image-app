import { useState } from "react";
import "./App.css";
import Picture from "./component/Picture";

function App() {
  const [word, setWord] = useState("");
  const [photos,setPhotos] = useState([])


  function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("กรุณาป้อนชื่อรูปภาพ");
    } else {
      //เรียกใช้งานAPI
      fetchImageFromAPI()
      
    }
  }

  async function fetchImageFromAPI() {
    const url = `${import.meta.env.VITE_API_URL}?page=1&query=${word}&client_id=${import.meta.env.VITE_API_KEY}&per_page=15`;
    const res = await fetch(url)  //ดึงข้อมูลรูปภาพตามลิงค์ที่กำหนด
    const data = await res.json()
    const result = data.results
    if(result.length==0){
      alert("ไม่มีข้อมูลรูปภาพ")
      setWord("")
    }else{
      //แสดงข้อมูลรูปภาพ
      setPhotos(result)
    }
  }
  return (
    <>
      <h1>ระบบค้นหารูปภาพด้วย API</h1>
      <form onSubmit={searchImage}>
        <input
          type="text"
          placeholder="ป้อนรูปภาพที่ต้องการค้นหา"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        Test1234
        <button type="submit">ค้นหา</button>
      </form>
    <div className="search-result">
      {photos.map((data,index)=>{
        return <Picture {...data} key={index}/>
      })}
    </div>
    </>
  );
}

export default App;
