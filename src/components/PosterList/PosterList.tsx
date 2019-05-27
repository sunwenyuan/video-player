import React, { Component } from 'react';
import './PosterList.scss';
import { IVideo } from '../../interfaces/IVideo';
import { Poster } from '../Poster/Poster';

interface IPosterListProps {
    videos: IVideo[];
    playingVideoChange: (video: IVideo) => void;
}

export class PosterList extends Component<IPosterListProps, {}> {
    render() {
        const { videos } = this.props;
        return (
            <div className="PosterList">
                {
                    videos.map((video) => {
                        return <Poster key={video.id} video={video} clickHandler={(video) => this.handleVideoClick(video)} />
                    })
                }
            </div>
        );
    }

    private handleVideoClick(video: IVideo) {
        this.props.playingVideoChange(video);
    }
}
