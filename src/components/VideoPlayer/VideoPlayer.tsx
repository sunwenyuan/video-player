import React, { Component } from 'react';
import './VideoPlayer.scss';
import { IVideo } from '../../interfaces/IVideo';
import { VideoControlButton } from '../VideoControlButton/VideoControlButton';

interface IVideoPlayerProps {
    video: IVideo;
    autoplay: boolean;
}

interface IVideoPlayerState {
    playing: boolean;
}

export class VideoPlayer extends Component<
    IVideoPlayerProps,
    IVideoPlayerState
> {
    videoEl: HTMLMediaElement | null = null;

    constructor(props: IVideoPlayerProps) {
        super(props);
        this.state = {
            playing: false
        };
    }

    setVideoElRef(element: HTMLMediaElement) {
        this.videoEl = element;
    }

    render() {
        const { video, autoplay } = this.props;
        return (
            <div className="VideoPlayer">
                <video
                    id="myVideoPlayer"
                    autoPlay={autoplay}
                    controls
                    ref={(el) => {
                        if (el) {
                            this.setVideoElRef(el);
                        }
                    }}
                    onEnded={() => this.updatePlayStatue(false)}
                    onPause={() => this.updatePlayStatue(false)}
                    onPlay={() => this.updatePlayStatue(true)}
                >
                    <source src={video.video} type="video/mp4" />
                </video>
                <div className="VideoControls">
                    {this.state.playing && (
                        <VideoControlButton
                            onClick={() => this.pauseVideo()}
                        >
                            Pause
                        </VideoControlButton>
                    )}
                    {!this.state.playing && (
                        <VideoControlButton
                            onClick={() => this.playVideo()}
                        >
                            Play
                        </VideoControlButton>
                    )}
                    <VideoControlButton onClick={() => this.videoBackward(10)}>
                        Backward 10s
                    </VideoControlButton>
                    <VideoControlButton onClick={() => this.videoForward(10)}>
                        Forward 10s
                    </VideoControlButton>
                    <VideoControlButton onClick={() => this.videoBackward(25)}>
                        Backward 25s
                    </VideoControlButton>
                    <VideoControlButton onClick={() => this.videoForward(25)}>
                        Forward 25s
                    </VideoControlButton>
                </div>
            </div>
        );
    }

    private videoForward(forwardSeconds: number) {
        if (this.videoEl) {
            this.videoEl.currentTime =
                this.videoEl.currentTime + forwardSeconds;
        }
    }

    private videoBackward(backwardSeconds: number) {
        if (this.videoEl) {
            // Set currentTime to 0 if backwardSecond is more than currentTime,
            // This is to prevent set currentTime to minus value.
            this.videoEl.currentTime =
                this.videoEl.currentTime <= backwardSeconds
                    ? 0
                    : this.videoEl.currentTime - backwardSeconds;
        }
    }

    private pauseVideo() {
        if (this.videoEl) {
            this.videoEl.pause();
        }
    }

    private playVideo() {
        if (this.videoEl) {
            this.videoEl.play();
        }
    }

    private updatePlayStatue(playing: boolean) {
        this.setState({
            playing
        });
    }
}
