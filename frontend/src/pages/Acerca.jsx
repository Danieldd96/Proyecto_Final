import React from 'react';
import { Flex, DataList, Badge, Box, Heading, Text, Link, Separator } from '@radix-ui/themes';
import Navbar from '../components/Navbar'

const Acerca = () => {
  return (
    <div>
      <Navbar />
      <Box p="7" pr="8">

        <Heading size="6" mb="2" trim="start">
          Sobre Nuestra Tienda LOGO de Bicicletas
        </Heading>

        <Flex direction="column" gap="4">
          <Text as="p">
            Somos una tienda especializada en ofrecer productos y servicios para ciclistas de todos los niveles. Aquí
            encontrarás bicicletas de alta calidad, repuestos, ropa, accesorios, y productos de nutrición. Además,
            contamos con un taller de mantenimiento y tutoriales para ayudarte a cuidar tu bici.
          </Text>

          <Text as="p">
            Nuestro objetivo es que disfrutes al máximo de cada salida en bici, ofreciendo lo mejor en servicio y productos.
          </Text>

          <Heading size="5" mb="2">
            Nuestros Servicios
          </Heading>

          <DataList.Root>
            <DataList.Item align="center">
              <DataList.Value>
                <Badge color="orange" variant="soft" radius="full">
                  Taller de Bicicletas
                </Badge>
              </DataList.Value>

              <DataList.Value>
                Ofrecemos mantenimiento completo, ajuste de frenos, cambios de llantas, y mucho más.
              </DataList.Value>

            </DataList.Item>

            <DataList.Item align="center">

              <DataList.Value>
                <Badge color="cyan" variant="soft" radius="full">
                  Tutoriales
                </Badge>
              </DataList.Value>

              <DataList.Value>
                Accede a nuestros tutoriales para realizar ajustes y mantenimiento en casa.
              </DataList.Value>

            </DataList.Item>

            <DataList.Item align="center">

              <DataList.Value>
                <Badge color="lime" variant="soft" radius="full">
                  Partes y Accesorios
                </Badge>
              </DataList.Value>

              <DataList.Value>
                Encuentra una amplia variedad de partes, repuestos, y accesorios para mejorar tu experiencia.
              </DataList.Value>

            </DataList.Item>

            <DataList.Item align="center">

              <DataList.Value>
                <Badge color="violet" variant="soft" radius="full">
                  Ropa y Nutrición
                </Badge>
              </DataList.Value>

              <DataList.Value>
                Descubre nuestra selección de ropa especializada y productos de nutrición.
              </DataList.Value>
              
            </DataList.Item>
          </DataList.Root>

          <Separator orientation="horizontal" mb="4" />

          <Heading size="5" mb="2">
            Información de Contacto
          </Heading>

          <DataList.Root>
            <DataList.Item>
              
              <DataList.Value>
                <Link href="tel:70407668">70407668</Link>
              </DataList.Value>
              <DataList.Value>
                <Link href="tel:70407668">70407668</Link>
              </DataList.Value>

            </DataList.Item>

            <DataList.Item>

              <DataList.Value>
                <Link href="mailto:correo1@example.com">correo1@example.com</Link>
              </DataList.Value>
              <DataList.Value>
                <Link href="mailto:correo2@example.com">correo2@example.com</Link>
              </DataList.Value>
              <DataList.Value>
                <Link href="mailto:correo3@example.com">correo3@example.com</Link>
              </DataList.Value>

            </DataList.Item>
          </DataList.Root>
        </Flex>
      </Box>
    </div>
  );
};

export default Acerca;
