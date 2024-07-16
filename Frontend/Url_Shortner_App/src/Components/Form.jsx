import { useState } from "react"

 function Form() {
    const [longUrlObj,setLongUrlObj]=useState({
        longUrl:"",
    });
    const[shortUrl,setShortUrl]=useState('');
    const changeIp=(e)=>{
          setLongUrlObj({longUrl:e.target.value});
    }
  async function getShortUrlFunction(e){
    e.preventDefault();
   if(!longUrlObj.longUrl){
    alert("Please Enter Long URl ....")
   }
   try {
    const response=await fetch('https://url-shortner-web-app.onrender.com',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(longUrlObj)
    });
    console.log(response);
    const data = await response.json();
    setShortUrl(data.data);
   } catch (error) {
    console.log("Error Occured while fetching data" ,error);
   }

   }
  return (
   <main className="h-[100vh] w-[100vw] flex justify-center items-center text-[25px] flex-col " >
       <form action="" className="shadow-[0px_0px_5px_black] w-[60%] text-center p-2 flex flex-col gap-4 mb-6">
        <input type="text" placeholder="Enter the Long URL...." className="w-[100%] px-2 py-1 border-2 border-black" 
        onChange={changeIp}/>
        <button className="bg-blue-400 px-4 py-2 w-fit mx-auto" onClick={getShortUrlFunction}>Get Url</button>
       </form>

       {
        shortUrl &&
        <div className=" text-[25px] p-4 shadow-[0px_0px_5px_black] w-[50%]">
            <h1 className="my-2">Your shorten URL is here ....</h1>
            <a className="my-2 text-blue-600 underline text-[20px]" target="blank" href={shortUrl}>{shortUrl}</a>
        </div>
        
       }
     </main>
  )
}

export default Form;
