import React from 'react';

import {
 Container
 } from './styles';

interface Props {
    actived?: boolean
}

export function Bullet({ actived = false }: Props){
return (
     <Container actived={actived}/>
    );
}