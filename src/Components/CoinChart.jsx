import { CircularProgress, createTheme, ThemeProvider } from '@material-ui/core';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
  
import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { HistoricalChart } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import { makeStyles } from '@material-ui/styles';



const CoinChart = ({coin}) => {

   

    const[historicData,setHistoricData] = useState();
    const[days,setDays] = useState(1);
    const{currency} = CryptoState();
    const[flag,setFlag] = useState(false);

    const useStyles = makeStyles((theme)=>({
        container:{
            width:"75%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            marginTop:25,
            padding:40,
         
        },
    }))

    const classes = useStyles();

    const fetchHistoricData = async()=>{

        const{data} = await axios.get(HistoricalChart(coin.id,days,currency))
        setHistoricData(data.prices);
        setFlag(true)
    }

    useEffect(() => {
        
        fetchHistoricData();
    }, [currency])


    const darkTheme = createTheme({
        palette : {
            primary : {
                main : "#fff"
            },
            type : "dark"
        }
    })

    const data = [
        {
          name: "Page A",
          uv: 400,
          pv: 2400,
          amt: 2400
        },
        {
          name: "Page B",
          uv: 3000,
          pv: 1398,
          amt: 2210
        },
        {
          name: "Page C",
          uv: 2000,
          pv: 9800,
          amt: 2290
        },
        {
          name: "Page D",
          uv: 2780,
          pv: 3908,
          amt: 2000
        },
        {
          name: "Page E",
          uv: 1890,
          pv: 4800,
          amt: 2181
        },
        {
          name: "Page F",
          uv: 2390,
          pv: 3800,
          amt: 2500
        },
        {
          name: "Page G",
          uv: 3490,
          pv: 4300,
          amt: 2100
        }
      ];
    
    
  return (
    <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
            {
                !historicData | flag === false ? (
                    <CircularProgress
                    style={{color : "yellow"}}
                    size = {250}
                    thickness={1}
                    />
                ):(


                    <LineChart
      width={900}
      height={600}
      data={


        historicData.map((coin)=>{

            let date = new Date(coin[0])
            date = date.toLocaleDateString();

            return{
                month : date,
                amount : coin[1]

            }
        })
      }
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 2" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="amount"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    
    </LineChart>
                )
            }
        </div>

    </ThemeProvider>
  )
}

export default CoinChart