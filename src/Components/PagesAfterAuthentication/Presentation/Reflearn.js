import React, { useState, useEffect,useRef } from 'react';
import { useRouter } from 'next/router'





export const Reflearn=()=> {
    // const [counter, setCounter] = useState(0);
    // const dataFetchedRef = useRef(false);
  
    // const fetchData = () => {
    //       console.log('Fetching data...');
    //       setCounter((oldValue) => oldValue+1);
    //   }
  
    // useEffect(() => {
    //     if (dataFetchedRef.current) return;
    //     dataFetchedRef.current = true;
       
    //     fetchData();
    // },[])
    // const[change,setchange]=useState(true)


    // function Live()
    // {
    //   // const[change,setchange]=useState(false)
    //   console.log("indise live func");
      
    //   setchange(false);

   
    //  return(<>
    //      <div>called using return of Live</div>
       
    //      {console.log(change)}
        

    //  </>)
    // }
console.log(window.innerHeight);
console.log(window.innerWidth);


window.addEventListener('resize',()=>
{
  console.log("resize hora h")
})

    // const router=useRouter();
    // console.log(router)
    // // router.push("/thankyou")
  
    return (
      <div className="App">
     heklo
        </div>
    );
  }