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
   <main className="z-1 absolute top-0 h-[100vh] w-[100vw] flex justify-center items-center text-[15px]  min-[400px]:text-[20px] min-[500px]:text-[25px] flex-col bg-center bg-cover 
   bg-[url('https://images.unsplash.com/photo-1593291600870-0f5fd4d32794?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]" >
       <form action="" className="shadow-[0px_0px_5px_1px_white] w-[90%] min-[450px]:w-[85%] py-5 min-[700px]:w-[60%] text-center p-2 min-[500px]:p-5 flex flex-col gap-4 mb-6 bg-[rgba(0,0,0,50%)] rounded-xl">
        <input type="text" placeholder="Enter the Long URL...." className="w-[100%] px-2 py-1 rounded-lg bg-transparent border-2 border-white" 
        onChange={changeIp}/>
        <button className="bg-blue-400 px-2 min-[500px]:px-4 py-1 min-[500px]:py-2 w-fit mx-auto rounded-md hover:bg-transparent hover:text-white border-blue-400 border-2
         hover:border-white transition duration-150 ease-in" onClick={getShortUrlFunction}>Get Url</button>
       </form>

       {
        shortUrl &&
        <div className="text-[17px] min-[350px]:text-[20px] min-[500px]:text-[25px] p-4 shadow-[0px_0px_5px_1px_white] w-[50%] bg-[rgba(0,0,0,50%)] rounded-xl">
            <h1 className="my-2">Your shorten URL is here ....</h1>
            <a className="my-2 text-blue-600 underline text-[17px] min-[500px]:text-[20px] cursor-pointer" target="blank" href={shortUrl}>{shortUrl}</a>
        </div>
        
       }
     </main>
  )
}

export default Form;
