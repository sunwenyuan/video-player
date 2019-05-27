import React, { Component } from 'react';
import './Poster.scss';
import { IVideo } from '../../interfaces/IVideo';
import { Tooltip } from '../Tooltip/Tooltip';

interface IPosterProps {
    video: IVideo;
    clickHandler: (video: IVideo) => void;
}

export class Poster extends Component<IPosterProps, {}> {
    render() {
        const { video } = this.props;
        return (
            <div className="Poster">
                <div
                    className="InnerWrapper"
                    onClick={() => this.props.clickHandler(video)}
                >
                    <Tooltip text={video.description}>
                        <img src={video.image} alt={video.name} />
                        <div className="Title">{video.name}</div>
                    </Tooltip>
                </div>
            </div>
        );
    }
}
