import React, { Component } from 'react';
import './VideoControlButton.scss';

interface VideoControlButtonProps {
    onClick: () => void;
}

export class VideoControlButton extends Component<VideoControlButtonProps, {}> {
    render() {
        return (
            <button
                onClick={() => this.props.onClick()}
                className="VideoControlButton"
            >
                {this.props.children}
            </button>
        );
    }
}
