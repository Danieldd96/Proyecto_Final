import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import React from 'react';

export default function Info() {
  return (
    <div style={{ backgroundColor: 'black', color: 'white', borderTop: 'solid 1px white', padding: '30px 0' }}>
      <div style={{ padding: '0 30px' }}>
        <Flex columns={{ '@initial': '1', '@768': '6' }} gap={4}>
          <Box className='logo' style={{ marginTop: 20, maxWidth: 200, maxHeight: 112, display: 'flex', alignItems: 'center' ,marginRight:50}}>
            <Text style={{ fontSize: '1.5em', fontWeight: 'bold' }}>LOGO</Text>
            <Box style={{ marginLeft: 10 }}>
              <img src="src/img/marzo.png" width={50} height={50} alt="Company Logo" />
            </Box>
          </Box>
          <Box className='text-message' style={{marginRight:50}}>
            <p >
            © 2024 LOGO Company. All rights reserved. All trademarks are property of their respective owners in the US and other countries. VAT included in all prices where applicable.
            </p>
            <h2>Telefonos</h2>
            <ul>
            <li><a href="">+506-8877-6656</a></li>
            <li><a href="">+506-8877-6656</a></li>
            <li><a href="">+506-8877-6656</a></li>
            <li><a href="">+506-8877-6656</a></li>
            </ul>
            
          </Box>
          <Box >
            <div >
              <iframe
                width="100%"
                height={200}
                frameBorder={0}
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=100%25&height=600&hl=es&q=Les%20Rambles,%201%20Barcelona,%20Spain+(Mi%20nombre%20de%20egocios)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                title="Company Location"
                style={{ borderRadius: '8px', overflow: 'hidden' }}
              />
            </div>
          </Box>
        </Flex>
      </div>
    </div>
  );
}
