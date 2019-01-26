import React, { Component } from 'react'
import styled from 'react-emotion'
import { LEVEL_POPUP } from 'app-levels'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { tablet_max, phablet_max, phone_max } from '@time-with/media-queries'
import { Scrollbars } from 'react-custom-scrollbars'

class TWPopup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contentHeight: null,
      contentWidth: null,
      windowMaxHeight: null,
      windowMaxWidth: null,
      scrollerHeight: null,
      scrollerWidth: null,
    }
  }

  handleClosePopup = () => {
    if (!this.props.disableClose) {
      this.props.closePopup()
    }
  }

  handleScroll = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  adjustViewport = () => {
    let update = false
    const contentElement = document.getElementById('tw-popup-hidden-content')
    const closeElement = document.getElementById('tw-popup-close-div')
    if (contentElement) {
      let closeHeight = 0
      if (closeElement) { closeHeight = closeElement.clientHeight }
      const currentContentHeight = contentElement.clientHeight
      const currentContentWidth = contentElement.clientWidth
      const windowMaxHeight = (currentContentHeight + closeHeight) > window.innerHeight ? window.innerHeight : (currentContentHeight + closeHeight)
      const windowMaxWidth = currentContentWidth > window.innerWidth ? window.innerWidth : 'auto'
      const scrollerHeight = (currentContentHeight + closeHeight) > window.innerHeight ? (window.innerHeight - closeHeight) : currentContentHeight
      const scrollerWidth = currentContentWidth > window.innerWidth ? window.innerWidth : currentContentWidth
      if (this.state.windowMaxHeight !== windowMaxHeight
      || this.state.windowMaxWidth !== windowMaxWidth
      || this.state.contentHeight !== currentContentHeight
      || this.state.contentWidth !== currentContentWidth) { update = true }

      if (update) {
        this.setState({
          windowMaxHeight: windowMaxHeight,
          windowMaxWidth: windowMaxWidth,
          contentHeight: currentContentHeight,
          contentWidth: currentContentWidth,
          scrollerHeight: scrollerHeight,
          scrollerWidth: scrollerWidth,
        })
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.adjustViewport)
    window.addEventListener('scroll', this.handleScroll)
    // TWPopup never unmounts
  }

  renderClose = () => {
    return (
      <CloseDIV id='tw-popup-close-div' onClick={this.handleClosePopup}>
        <CloseP>close</CloseP>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" style={closeIconStyle}><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
      </CloseDIV>
    )
  }

  render() {
    const { active, content, disableClose, disablePadding, backgroundColor } = this.props
    if (!active || !content) { return null }
    setTimeout(() => this.adjustViewport(), 10)
    return (
      <RootDIV id='tw-popup-root' backgroundColor={backgroundColor}>
        <Window id='tw-popup-window' style={{ maxWidth: this.state.windowMaxWidth, maxHeight: this.state.windowMaxHeight }}>
          { !disableClose && this.renderClose() }
          <Scrollbars
            style={{ height: this.state.scrollerHeight, width: this.state.scrollerWidth }}>
            <ContentDIV disablePadding={disablePadding}>
              { content }
            </ContentDIV>
          </Scrollbars>
        </Window>
        <BGDIV onClick={this.handleClosePopup} interactive={!disableClose}></BGDIV>
        <Hidden id='tw-popup-hidden-content'>
          { !disableClose && this.renderClose() }
          <ContentDIV>
            { content }
          </ContentDIV>
        </Hidden>
      </RootDIV>
    )
  }
}

const defaultBackgroundColor = 'rgba(0,0,0,0.5)'

export const showPopup = function(popupData) {
  return {
    type: 'SHOW_POPUP',
    active: true,
    content: popupData.content,
    disableClose: popupData.disableClose,
    disablePadding: popupData.disablePadding,
    backgroundColor: popupData.backgroundColor ? popupData.backgroundColor : defaultBackgroundColor,
  }
}
export const closePopup = function() {
  return {
    type: 'CLOSE_POPUP',
    active: false,
  }
}

export function popupReducer(state = {
  content: null,
  active: false,
  disableClose: false,
  disablePadding: false,
  backgroundColor: defaultBackgroundColor,
}, action) {
  switch (action.type) {
    case 'SHOW_POPUP': {
      document.documentElement.style.overflow = 'hidden'
      return {
        ...state,
        active: true,
        content: action.content,
        disableClose: action.disableClose,
        disablePadding: action.disablePadding,
        backgroundColor: action.backgroundColor,
      };
    }
    case 'CLOSE_POPUP': {
      document.documentElement.style.overflow = 'auto'
      return {
        ...state,
        active: false,
        disableClose: false,
        disablePadding: false,
        backgroundColor: defaultBackgroundColor,
      };
    }
    default:
      break;
  }
  return state;
}


const mapStoreToProps = ( store ) => {
  return {
    active: store.popupReducer.active,
    content: store.popupReducer.content,
    disableClose: store.popupReducer.disableClose,
    disablePadding: store.popupReducer.disablePadding,
    backgroundColor: store.popupReducer.backgroundColor,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    closePopup,
  }, dispatch )
};

export default connect( mapStoreToProps, mapDispatchToProps )( TWPopup )

const RootDIV = styled.div(props => ({
  zIndex: LEVEL_POPUP,
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

const Window = styled.div({
  borderRadius: '3px',
  padding: '0',
  background: 'white',
  position: 'relative',
  zIndex: LEVEL_POPUP + 1,
})

const CloseDIV = styled.div({
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

const ContentDIV = styled.div(props => ({
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

const BGDIV = styled.div({
  position: 'absolute',
  zIndex: LEVEL_POPUP,
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
})

const closeIconStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  height: '24px',
  marginLeft: '10px',
  marginRight: '5px',
  marginTop: '2px',
  fill: '#63C1E8',
}

const CloseP = styled.p({
  display: 'inline-block',
  verticalAlign: 'top',
  fontWeight: 'bold',
  lineHeight: '26px',
  fontSize: '18px',
})

const Hidden = styled.div({
  position: 'absolute',
  opacity: '0',
  pointerEvents: 'none',
})