import React, { Component } from 'react'
import glamorous from 'glamorous'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { tablet_max, phablet_max, phone_max } from '@time-with/media-queries'
import { Scrollbars } from 'react-custom-scrollbars'

class TWPopup extends Component {

  handleClosePopup = () => {
    this.props.closePopup()
  }

  adjustViewport() {
    const contentDiv = document.getElementById('popup-content-div')
    if (contentDiv) {
      const windowHeight = window.innerHeight
      const popupContentHeight = contentDiv.clientHeight
      if (popupContentHeight < windowHeight) {
        const newMarginTop = (windowHeight - popupContentHeight) / 2
        const newMarginTopCompensation = newMarginTop / 8
        contentDiv.style.marginTop = `${newMarginTop - newMarginTopCompensation}px`
      } else {
        contentDiv.style.marginTop = '0px'
      }
    }
    contentDiv.style.opacity = '1'
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.adjustViewport())
  }

  render() {
    const { content } = this.props

    if (!content) { return null }

    setTimeout(() => this.adjustViewport(), 1)
    return (
      <RootDIV id='popup-window'>
        <ContentDIV id='popup-content-div' style={{opacity: 0}}>
          <Scrollbars autoHeight autoHeightMin={300} autoHeightMax={window.innerHeight} id='quick-confirm-scrollbars' style={ scrollBarsStyle }>
            <CloseDIV onClick={this.handleClosePopup}>
              <CloseP>close</CloseP>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" style={closeIconStyle}><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
            </CloseDIV>
            <ContentContainerDIV>
              { content }
            </ContentContainerDIV>
          </Scrollbars>
        </ContentDIV>
        <BGDIV onClick={this.handleClosePopup}></BGDIV>
      </RootDIV>
    )
  }
}

const showPopup = function(content) {
  return {
    type: 'SHOW_POPUP',
    payload: content,
  };
}
const closePopup = function() {
  return {
    type: 'CLOSE_POPUP',
    payload: null,
  };
}

export const popupActions = {
  showPopup: showPopup,
  closePopup: closePopup
}

export function popupReducer(state = {
  content: null,
}, action) {
  switch (action.type) {
    case 'SHOW_POPUP': {
      return {
        ...state,
        content: action.payload,
      };
    }
    case 'CLOSE_POPUP': {
      return {
        ...state,
        content: null,
      };
    }
    default:
      break;
  }
  return state;
}


const mapStoreToProps = ( store ) => {
  return {
    content: store.popupReducer.content,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    closePopup,
  }, dispatch )
};

export default connect( mapStoreToProps, mapDispatchToProps )( TWPopup )


// dom elements


const scrollBarsStyle = {
  width: '100%',
  margin: '0 auto',
}

const ContentContainerDIV = glamorous.div({
  padding: '30px',
  paddingTop: '0',
  [tablet_max]: {
    padding: '26px',
    paddingTop: '0',
  },
  [phablet_max]: {
    padding: '23px',
    paddingTop: '0',
  },
  [phone_max]: {
    padding: '20px',
    paddingTop: '0',
  }
})

const RootDIV = glamorous.div({
  zIndex: '200',
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: '0',
  left: '0',
})

const ContentDIV = glamorous.div({
  borderRadius: '3px',
  zIndex: '202',
  padding: '0px',
  maxWidth: '630px',
  position: 'relative',
  paddingTop: '0px',
  paddingBottom: '0px',
  margin: '0 auto',
  display: 'block',
  background: 'white',
  textAlign: 'center',
  [phablet_max]: {
    width: '98%',
  },
})

const CloseDIV = glamorous.div({
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

const BGDIV = glamorous.div({
  position: 'absolute',
  zIndex: '201',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.5)',
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

const CloseP = glamorous.p({
  display: 'inline-block',
  verticalAlign: 'top',
  fontWeight: 'bold',
  lineHeight: '26px',
  fontSize: '18px',
})
