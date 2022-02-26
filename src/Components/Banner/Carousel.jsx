import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../Config/api';
import { CryptoState } from '../../CryptoContext';


const useStyles = makeStyles({

  carousel : {
    height : "50%",
    display : "flex",
    alignItems : "center"
  },
  carouselItem : {
    display : "flex",
    flexDirection : "column",
    alignItems : "center",
    cursor : "pointer",
    textTransform :"uppercase",
    color:"white"
  }
})
/*
export function numberWithCommas(x){
  return x.toString().replace((?<=\\.[0-9]{2}),",");
}
*/
const Carousel = () => {

  const[trendingState,setTrendingState] = useState([]);

  const {currency,symbol} = CryptoState();
  const classes = useStyles();
  const fetchTrendingCoins = async()=>{
    const {data} = await axios.get(TrendingCoins(currency));
    console.log(data)
    setTrendingState(data);
  }

  useEffect(() => {
    
    fetchTrendingCoins();
  }, [currency])

 

  const items = trendingState.map((coin)=>{
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link 
      className={classes.carouselItem}
      to={`/coins/${coin.id}`}
      >
      <img src={coin?.image} alt={coin?.name}
      height="80"
      style={{marginBottom:10}}
      />
        <span>{coin?.symbol}
        &nbsp;
        <span
        
        style={{
          color : profit > 0 ? "rgb(14,203,129)" : "red",
          fontWeight : 500,
        }}
        >
           {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
        </span>
        </span>
        <span style={{fontSize : 22, fontWeight : 500}}>
          {symbol} {coin?.current_price}
        </span>
     
      </Link>

    )
  })

  const responsive = {

    0:{
      items:2
    },
    512:{
      items:4,
    }
  }

  return (
    <div>
        <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1000}
        disableButtonsControls = "true"
        disableDotsControls = "true"
        autoPlay

        responsive={responsive}
        
        items = {items} />
    </div>
  )
}

export default Carousel