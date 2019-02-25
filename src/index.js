import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
  RootDiv,
  BackgroundDiv,
  Window,
  CloseDIV,
  ContentDIV,
  BGDIV,
  closeIconStyle,
  CloseP
} from './elements'

const initialState = {
  active: false,
  content: null,
  disableClose: false,
  disablePadding: false,
}

class TWPopup extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidUpdate(prevProps) {
    if (this.props.content) { // if has content
      if (!this.state.active) { // if is not active
        // set active if there is content
        this.setState({
          active: true,
          content: this.props.content,
          disableClose: this.props.disableClose,
          disablePadding: this.props.disablePadding,
        });
      }    
    }
  }

  handleClosePopup = () => {
    if (!this.props.disableClose) {
      this.props.closePopup()
    }
  }

  renderClose = () => {
    return (
      <CloseDIV onClick={this.handleClosePopup} id='tw-popup-close-element'>
        <CloseP>close</CloseP>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" style={closeIconStyle}><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
      </CloseDIV>
    )
  }

  renderEmpty = () => {
    return (
      <div id='tw-popup-empty' style={{position: 'fixed'}}></div>
    )
  }

  renderContent = () => {
    const {
      content,
      disableClose,
      disablePadding,
      backgroundColor
    } = this.state
    return (
      <BackgroundDiv id='tw-popup-background' backgroundColor={backgroundColor}>
        <Window id='tw-popup-window'>
          { !disableClose && this.renderClose() }
          <ContentDIV disablePadding={disablePadding}>
            { content }
          </ContentDIV>
        </Window>
        <BGDIV onClick={this.handleClosePopup} interactive={!disableClose}></BGDIV>
      </BackgroundDiv>
    )
  }

  render() {
    const { active, content } = this.state
    if (!active) { return this.renderEmpty() }
    if (!content) { return this.renderEmpty() }

    return (
      <RootDiv id='tw-popup-root'>
        { this.renderContent() }
      </RootDiv>
    )
  }
}

const defaultBackgroundColor = 'rgba(0,0,0,0.5)'

export const showPopup = function(popupData) {
  return {
    type: 'SHOW_POPUP',
    content: popupData.content,
    disableClose: popupData.disableClose,
    disablePadding: popupData.disablePadding,
    backgroundColor: popupData.backgroundColor ? popupData.backgroundColor : defaultBackgroundColor,
  }
}
export const closePopup = function() {
  return {
    type: 'CLOSE_POPUP',
  }
}

export function popupReducer(state = {
  content: null,
  disableClose: false,
  disablePadding: false,
  backgroundColor: defaultBackgroundColor,
}, action) {
  switch (action.type) {
    case 'SHOW_POPUP': {
      document.documentElement.style.overflowY = 'hidden'
      return {
        ...state,
        content: action.content,
        disableClose: action.disableClose,
        disablePadding: action.disablePadding,
        backgroundColor: action.backgroundColor,
      };
    }
    case 'CLOSE_POPUP': {
      document.documentElement.style.overflowY = 'scroll'
      return {
        ...state,
        content: null,
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
