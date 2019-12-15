import tw from 'tailwind.macro'
import styled from 'styled-components'


export const Title = styled.h1`
  ${tw`relative inline-block sm:text-4xl md:text-5xl lg:text-6xl font-title font-bold tracking-normal leading-tight my-6 ml-3 sm: ml-0`}
  color: rgba(255,255,255,0.9);
  text-shadow: 0 2px 10px rgba(0,0,0,0.4);
`

export const Subtitle = styled.h2`
  ${tw`text-2xl sm:mt-2 lg:text-3xl font-title text-white lg:mt-8 ml-2 xxl:w-3/4`};
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
`

export const SectionTitle = styled.h2`
  ${tw`text-2xl sm:mt-2 lg:text-3xl font-title text-white lg:mt-8 ml-2 xxl:w-3/4`};
  color: ${props => (props.color ? props.color : '#fff')};
  z-index: 99;
`
