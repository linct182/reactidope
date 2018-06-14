import React, { Component } from 'react';
// import { compose, withState, withHandlers } from 'recompose';
import styled from 'react-emotion';
import { Tooltip } from 'reactstrap';
import queueIcon from '../../assets/icons/status_queue.svg'; 
import verifiedIcon from '../../assets/icons/status_verified.svg';
import activeIcon from '../../assets/icons/status_active.svg'; 
import resolveIcon from '../../assets/icons/status_resolve.svg';
import closeIcon from '../../assets/icons/status_close.svg';
import pendingIcon from '../../assets/icons/icon_pending.svg';
import ongoingIcon from '../../assets/icons/icon_ongoing.svg';

// Case
// 1 - queued
// 2 - verified
// 3 - active
// 4 - resolved
// 5 - closed

// Website
// 1 - pending(queued)
// 2 - ongoing(active)
// 3 - done(verified)

const StatusContainer = styled('div')({
  display: 'flex'
}); 

const StatusIcon = styled('img')({
  width: 50,
  height: 50,
  padding: 10
}); 

const StatusDescription = styled('div')({
  margin: 'auto 10px'
}); 

class Status extends Component{
  state = {
    tooltipOpen: false
  }

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render(){
    let icon = queueIcon;
    if (this.props.isWebsiteStatus){
      switch (this.props.status.id) {
        case 1:
          icon = pendingIcon;
          break;
        case 2:
          icon = ongoingIcon;
        break;
        case 3:
          icon = verifiedIcon;
          break;
        default:
          break;
      }
    }else{
      switch (this.props.status.id) {
        case 1:
          icon = queueIcon;
          break;
        case 2:
          icon = verifiedIcon;
          break;
        case 3:
          icon = activeIcon;
          break;
        case 4:
          icon = resolveIcon;
          break;
        case 5:
          icon = closeIcon;
          break;
        default:
          break;
      }
    }
    return (
      <StatusContainer>
        <StatusIcon className="web-img" src={icon} />
        <StatusDescription id={`description-${this.props.caseId}`} className="web-desc"> {this.props.status.name} </StatusDescription>
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={`description-${this.props.caseId}`} toggle={this.toggle} >
          {this.props.status.description}
        </Tooltip>
      </StatusContainer>
    )
  }
}

export default Status;