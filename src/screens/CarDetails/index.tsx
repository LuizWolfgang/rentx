import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Acessory';


import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import energySvg from '../../assets/energy.svg';
import hybridSvg from '../../assets/hybrid.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';
import carSvg from '../../assets/car.svg';


import {
 Container,
 Header,
 CarImages,
 Content,
 Details,
 Description,
 Brand,
 Name,
 Rent,
 Period,
 Price,
 About,
 Acessories,
 Footer
 } from './styles';
import { Button } from '../../components/Button';

export function CarDetails(){
return (
     <Container>
         <Header>
             <BackButton onPress={() => console.log('oi')}/>
         </Header>
        <CarImages>
            <ImageSlider imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']}/>
        </CarImages>

        <Content>
            <Details>
                <Description>
                    <Brand>Lamboguini</Brand>
                    <Name>Huracan</Name>
                </Description>
            <Rent>
                <Period>Ao dia</Period>
                <Price>R$ 580</Price>
            </Rent>    
            </Details>

            <Acessories>
               <Accessory name="380Km/h" icon={speedSvg} />
               <Accessory name="3.2.s" icon={accelerationSvg} />
               <Accessory name="800 HP" icon={forceSvg} />
               <Accessory name="Gasolina" icon={gasolineSvg} />
               <Accessory name="Auto" icon={energySvg} />
               <Accessory name="2 pessoas" icon={peopleSvg} />
            </Acessories>

            <About>
            The Huracán EVO is the evolution of the most successful V10-powered Lamborghini ever. 
            The result of fine-tuning and refining existing features, combined with new design solutions that increase performance. 
   
            </About>

            <Footer>
                <Button title="Confirmar" color="#18b120"/>
            </Footer>

        </Content>
     </Container>
    )
}