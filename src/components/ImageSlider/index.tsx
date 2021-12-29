import React from 'react';

import {
 Container,
 ImageIndexes,
 ImageIndex,
 CarImageWrapper,
 CarImage,
 } from './styles';

interface Props {
 imagesUrl: string[];
} 

export function ImageSlider({imagesUrl}: Props){
return (
    <Container>
        <ImageIndexes>
            <ImageIndex actived={true}/>
            <ImageIndex actived={false}/>
            <ImageIndex actived={false}/>
            <ImageIndex actived={false}/>
        </ImageIndexes>

        <CarImageWrapper>
            <CarImage
                source={{uri: imagesUrl[0]}}
                resizeMode="contain"
            />
        </CarImageWrapper>
     </Container>
    );
}