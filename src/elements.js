import styled from 'react-emotion'
import { LEVEL_POPUP } from 'app-levels'
import { tablet_max, phablet_max, phone_max } from '@time-with/media-queries'

export const RootDiv = styled.div({
  zIndex: LEVEL_POPUP,
  position: 'fixed',
  top: '0',
  left: '0',
  height: '100%',
  width: '100%',
})

export const BackgroundDiv = styled.div(props => ({
  zIndex: LEVEL_POPUP + 1,
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: '0',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: props.backgroundColor ? props.backgroundColor : 'rgba(0,0,0,0.5)',
}))

export const Window = styled.div({
  borderRadius: '3px',
  padding: '0',
  background: 'white',
  position: 'relative',
  maxHeight: '100%',
  overflowY: 'scroll',
  zIndex: LEVEL_POPUP + 1,
})

export const CloseDIV = styled.div({
  cursor: 'pointer',
  width: '100%',
  textAlign: 'right',
  paddingRight: '7px',
  paddingTop: '7px',
  '& .svg-inline--fa': {
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '1px',
    color: '#63C1E8',
    fontSize: '26px',
  }
})

export const ContentDIV = styled.div(props => ({
  padding: props.disablePadding ? '0' : '30px',
  [tablet_max]: {
    padding: props.disablePadding ? '0' : '25px',
  },
  [phablet_max]: {
    padding: props.disablePadding ? '0' : '20px',
  },
  [phone_max]: {
    padding: props.disablePadding ? '0' : '20px 10px',
  },
}))

export const BGDIV = styled.div({
  position: 'absolute',
  zIndex: LEVEL_POPUP,
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
})

export const closeIconStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  height: '24px',
  marginLeft: '10px',
  marginRight: '5px',
  marginTop: '2px',
  fill: '#63C1E8',
}

export const CloseP = styled.p({
  display: 'inline-block',
  verticalAlign: 'top',
  fontWeight: 'bold',
  lineHeight: '26px',
  fontSize: '18px',
})
