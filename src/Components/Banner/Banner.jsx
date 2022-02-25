import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import bannerImg from './bannerImg.jpg';

const useStyles = makeStyles({
    banner : {
        backgroundImage : `url(${bannerImg})`
    },
    bannerContent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop : 25,
        justifyContent:"space-around"
    },
    tagline : {
        display : "flex",
        height : "40%",
        flexDirection : "column",
        justifyContent:"center",
        textAlign : "center"
    }
})

const Banner = () => {

    const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                
                variant='h2'
                style={{
                    fontWeight : "bold",
                    marginBottom : 15
                }}
                >
                    Crypto-Geek
                </Typography>
                <Typography
                variant='subtitle'
                >
                    Get all the info regarding your favourite Crypto Currency
                </Typography>
            </div>
        </Container>
        
    </div>
  )
}

export default Banner