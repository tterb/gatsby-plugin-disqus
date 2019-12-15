import React from 'react'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import swoopTop from './Wave/swoop_topright.svg'
import swoopTopLeft from './Wave/swoop_topleft.svg'
import swoopBottom from './Wave/swoop_down.svg'
// import swoopBottomLeft from './Wave/swoop_downleft.svg'

const SwoopTop = styled.div`
  ${tw`absolute w-full pin-l mb-0`}
  background: url(${swoopTop}) no-repeat;
  background-size: 2045px 240px;
  background-position: 50%;
  height: 240px;
  bottom: -40px;
  content: '';
  z-index: 0 !important;
`

const SwoopTopLeft = styled.div`
  ${tw`absolute w-full pin-l mb-0`}
  background: url(${swoopTopLeft}) no-repeat;
  background-size: 2045px 180px;
  background-position: 50%;
  height: 180px;
  bottom: -20px;
  content: '';
  z-index: 0 !important;
`

const SwoopBottom = styled.div`
  ${tw`absolute w-full pin-l mb-0`}
  background: url(${swoopBottom}) no-repeat;
  background-size: 2045px 240px;
  background-position: 50%;
  height: 240px;
  bottom: -200px;
  content: '';
  z-index: 9 !important;
`

// const SwoopBottomLeft = styled.div`
//   ${tw`absolute w-full pin-l mb-0`}
//   background: url(${swoopBottomLeft}) no-repeat;
//   background-size: 2045px 240px;
//   background-position: 50%;
//   height: 240px;
//   bottom: -40px;
//   content: '';
//   z-index: 0 !important;
// `

const Wave = ({ position, direction }) => (
  <>
    { position === 'top' ? 
      (direction === 'right') ? <SwoopTop /> : <SwoopTopLeft /> 
      :
      (direction === 'right') ? <SwoopBottom /> : <SwoopBottomLeft />
    }
  </>
)

Wave.defaultProps = {
  position: 'top',
  direction: 'right',
}

Wave.propTypes = {
  position: PropTypes.string,
  direction: PropTypes.string,
}

export default Wave
