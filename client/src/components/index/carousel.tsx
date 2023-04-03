import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../style/variables'
import Carousel1 from '../../assets/carousel1.jpg'
import Carousel2 from '../../assets/carousel2.jpg'
import Carousel3 from '../../assets/carousel3.jpg'

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const items = [{
    text: "Encuentra prendas en nuestro catálogo.",
    src: Carousel1
  }, {
    text: "Reserva tus prendas favoritas.",
    src: Carousel2
  }, {
    text: "Mira tu historial de compras.",
    src: Carousel3
  }];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(old => (old + 1) % 3);
    }, 4000);

    return () => clearTimeout(timer);
  }, [index]);

  const handleClick = (i: number) => {
    setIndex(i);
  }

  return (
    <CarouselContainer>
      {
        items.map((v, i) => (
          <CarouselItem key={i} active={index === i} className="carousel-item">
            <img src={v.src} alt={"carousel" + 1} />
            <h2>{v.text}</h2>
          </CarouselItem>
        ))
      }
      <div className="buttons">
        {items.map((v, i) => <CarouselButton key={i} onClick={() => handleClick(i)} active={index === i}></CarouselButton>)}
      </div>
    </CarouselContainer>
  )
}

export default Carousel

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 16rem;
  box-shadow: ${colors.shadow100};
  overflow: hidden;
  border-radius: 1rem;
  user-select: none;

  & > .buttons {
    display: flex;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    gap: .5rem;
  }
`;

interface CarouselActiveProps {
  active: boolean
}

const CarouselItem = styled.div<CarouselActiveProps>`
  position: absolute;
  height: 100%;
  padding: 2rem 4rem;
  width: 100%;
  color: ${colors.white};
  background:linear-gradient(0deg, ${colors.primary600rgb} 0%, ${colors.primary400rgb} 100%);
  transition: all 1s;
  opacity: ${props => props.active ? "1"  : "0"};
  isolation: isolate;
  border-radius: 1rem;

  & > h2 {
    font-size: 3rem;
  }

  @media screen and (max-width: 660px) {
    padding: 2rem;

    & > h2 {
      font-size: 2rem;
    }
  }

  & > img {
    z-index: -1;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    object-fit: cover;
    border-radius: 1rem;
  }
`;

const CarouselButton = styled.button<CarouselActiveProps>`
  width: ${props => props.active ? "1.5rem" : ".5rem"};
  height: .5rem;
  border-radius: .25rem;
  border: none;
  background-color: ${props => props.active ? colors.primary500 : colors.white};
  box-shadow: ${colors.shadow100};
  transition: all 1s;
  cursor: pointer;
`;