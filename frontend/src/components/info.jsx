import { Box, Flex, Grid,Text } from '@radix-ui/themes'
import React from 'react'

export default function Info() {
  return (
    <div style={{backgroundColor:"black",color:"white",border:"solid 1px",borderColor:"white",}} >
      <div  style={{padding:30}}>
        <Grid columns="6">
        <Box className='logo' style={{marginTop:20, maxWidth:200,maxHeight:112}}><Text>LOGO</Text><Box><img src="src/img/marzo.png" width={50} height={50}/></Box></Box>
        <div className='text-message' ><p>© 2024 LOGO Compani. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
        VAT included in all prices where applicable.</p></div>
        <Box >
        <div style={{ width: "100%", marginLeft:50,}}>
        <iframe
          width="100%"
          height={200}
          frameBorder={0}
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://maps.google.com/maps?width=100%25&height=600&hl=es&q=Les%20Rambles,%201%20Barcelona,%20Spain+(Mi%20nombre%20de%20egocios)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
        >
          &lt;a href="https://www.gps.ie/car-satnav-gps/"&gt;Sat Navs&lt;/a&gt;
        </iframe>
        </div>
        </Box>
        </Grid>
      </div>
    </div>
  )
}
