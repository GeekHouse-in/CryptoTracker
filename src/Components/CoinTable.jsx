import { Container, createTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../Config/api'
import { CryptoState } from '../CryptoContext'


const CoinTable = () => {
    const[coins,setCoins] = useState([]);
    const[search,setSearch] = useState();
    const {currency, symbol} = CryptoState();
    const fetchCoins = async() =>{

        const{data} = await axios.get(CoinList(currency))
        console.log(data);
        setCoins(data);
    }
    useEffect(()=>{
        fetchCoins();
    },[currency])

    const darkTheme = createTheme({
        palette : {
            primary : {
                main : "#fff"
            },
            type : "dark"
        }
    })
    

  return (
    <ThemeProvider theme = {darkTheme}>
    <Container style={{textAlign : "center"}}>
        <Typography
        
        variant = 'h4'
        style={{margin : 10}}
        >
        Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField 

            style={{marginBottom : 20, width:"100%"}}

            onChange = {(e)=>setSearch(e.target.value)}
            label = "Search For A Crypto Currency ..."
            variant = 'outlined'
        />

        <TableContainer>
            <Table>
                <TableHead style={{backgroundColor : "yellow"}}>
                    <TableRow>
                        {
                        ["Coin", "Price","24h Change", "Market Cap"].map((head)=>(

                            <TableCell
                            
                            style={{
                                color : "black",
                                fontWeight : "700"
                            }}
                            key = {head}
                            align = {head === "Coin" ? "" : "right"}
                            
                            >
                                {head}
                            </TableCell>
                        ))
                        
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    

                </TableBody>
            </Table>
        </TableContainer>

    </Container>
    </ThemeProvider>
  )
}

export default CoinTable