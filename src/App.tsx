import React, { Component } from 'react';
import './App.scss';
import { VideoPlayer } from './components/VideoPlayer/VideoPlayer';
import { VideoService } from './services/VideoService';
import { PosterList } from './components/PosterList/PosterList';
import { IVideo } from './interfaces/IVideo';
import { DummyVideoPlayer } from './components/DummyVideoPlayer/DummyVideoPlayer';

interface IAppState {
    videos: IVideo[];
    playingVideo: IVideo | undefined;
    autoplay: boolean;
}

interface IAppProps {}

class App extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            videos: [],
            playingVideo: undefined,
            autoplay: false // by default, set autoplay to false to prevent video autoplay after load webpage.
        };
    }

    async componentDidMount() {
        const videos = await VideoService.getVideos();
        const playingVideo = videos.length > 0 ? videos[0] : undefined;
        this.setState({
            videos,
            playingVideo
        });
    }

    render() {
        return (
            <div className="MyVideoPlayerApp">
                {this.state.playingVideo && (
                    <VideoPlayer
                        key={this.state.playingVideo.id}
                        video={this.state.playingVideo}
                        autoplay={this.state.autoplay}
                    />
                )}
                {this.state.playingVideo === undefined && <DummyVideoPlayer />}
                <PosterList
                    videos={this.state.videos}
                    playingVideoChange={(video) => {
                        if (
                            this.state.playingVideo === undefined ||
                            this.state.playingVideo.id !== video.id
                        ) {
                            this.setState({
                                playingVideo: video,
                                autoplay: true // set autoplay to true, since this happens after user click on a video poster.
                            });
                        }
                    }}
                />
            </div>
        );
    }
}

export default App;
