import React, { useContext, createContext,useState,useEffect } from 'react'

const crypto = createContext();

const CryptoContext = ({children}) => {

    const [currency,setCurrency] = useState("INR");
    const[symbol,setSymbol] = useState("Rs");

    useEffect(() => {
      
      if(currency === "INR")setSymbol("Rs");
      else setSymbol("$");

    }, [currency])
      

  return (
    
    <crypto.Provider value = {{currency,symbol,setCurrency}}>
        {children}
    </crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () =>{
  return useContext(crypto);
}