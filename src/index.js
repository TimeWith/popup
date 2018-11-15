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
      const windowMaxHeight = currentContentHeight > window.innerHeight ? window.innerHeight : (currentContentHeight + closeHeight)
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

  render() {
    const { active, content, disableClose } = this.props
    if (!active || !content) { return null }
    setTimeout(() => this.adjustViewport(), 10)
    return (
      <RootDIV id='tw-popup-root'>
        <Window id='tw-popup-window' style={{ maxWidth: this.state.windowMaxWidth, maxHeight: this.state.windowMaxHeight }}>
          { !disableClose &&
            <CloseDIV id='tw-popup-close-div' onClick={this.handleClosePopup}>
              <CloseP>close</CloseP>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" style={closeIconStyle}><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
            </CloseDIV>
          }
          <Scrollbars
            autoHeight
            autoHeightMin={100}
            autoHeightMax={this.state.scrollerHeight}
            style={{ width: this.state.scrollerWidth }}>
            <ContentDIV>
              { content }
            </ContentDIV>
          </Scrollbars>
        </Window>
        <BGDIV onClick={this.handleClosePopup} interactive={!disableClose}></BGDIV>
        <Hidden id='tw-popup-hidden-content'>
          { content }
        </Hidden>
      </RootDIV>
    )
  }
}

export const showPopup = function(content, disableClose) {
  return {
    type: 'SHOW_POPUP',
    active: true,
    content: content,
    disableClose: disableClose,
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
}, action) {
  switch (action.type) {
    case 'SHOW_POPUP': {
      document.documentElement.style.overflow = 'hidden'
      return {
        ...state,
        active: true,
        content: action.content,
        disableClose: action.disableClose,
      };
    }
    case 'CLOSE_POPUP': {
      document.documentElement.style.overflow = 'auto'
      return {
        ...state,
        active: false,
        disableClose: false,
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
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    closePopup,
  }, dispatch )
};

export default connect( mapStoreToProps, mapDispatchToProps )( TWPopup )


const RootDIV = styled.div({
  zIndex: LEVEL_POPUP,
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: '0',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.5)',
})

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

const ContentDIV = styled.div({
  padding: '30px',
  paddingTop: '0',
  [tablet_max]: {
    padding: '25px',
  },
  [phablet_max]: {
    padding: '20px',
  },
  [phone_max]: {
    padding: '10px',
  },
})

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