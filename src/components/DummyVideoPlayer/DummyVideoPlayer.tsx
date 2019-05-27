import React, { Component } from 'react';
import './DummyVideoPlayer.scss';

export class DummyVideoPlayer extends Component<{}, {}> {
    render() {
        return (
            <div className="DummyVideoPlayer">
                <span>No Video to Play</span>
            </div>
        );
    }
}
