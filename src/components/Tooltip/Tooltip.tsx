import React, { Component } from 'react';
import { ITooltipPosition } from '../../interfaces/ITooltipPosition';
import './Tooltip.scss';

interface ITooltipState {
    display: boolean;
    position: ITooltipPosition;
}

interface ITooltipProps {
    text: string;
}

export class Tooltip extends Component<ITooltipProps, ITooltipState> {
    tooltipEl: HTMLDivElement | null = null;

    constructor(props: ITooltipProps) {
        super(props);
        this.state = {
            display: false,
            position: {}
        };
    }

    setTooltipElRef(element: HTMLDivElement) {
        this.tooltipEl = element;
    }

    render() {
        const { text } = this.props;
        return (
            <>
                <div
                    onMouseEnter={() => this.updateDisplayStatus(true)}
                    onMouseOut={() => this.updateDisplayStatus(false)}
                    onMouseMove={(event: React.MouseEvent) =>
                        this.updatePosition(event)
                    }
                >
                    {this.props.children}
                </div>
                {this.state.display && (
                    <div
                        style={this.state.position}
                        className="Tooltip"
                        ref={(el) => {
                            if (el) {
                                this.setTooltipElRef(el);
                            }
                        }}
                    >
                        {text}
                    </div>
                )}
            </>
        );
    }

    private updateDisplayStatus(display: boolean) {
        this.setState({
            display
        });
    }

    private updatePosition(event: React.MouseEvent) {
        if (this.tooltipEl) {
            // Max width of tooltip
            const TooltipMaxWidth = 300;

            // offset between pointer and tooltip
            const offset = 5;

            // current mouse position
            const mousePositionX = event.clientX;
            const mousePositionY = event.clientY;

            // current viewport size
            const clientWidth = window.innerWidth;
            const clientHeight = window.innerHeight;

            const position: ITooltipPosition = {};

            if (clientWidth - mousePositionX > TooltipMaxWidth + 2 * offset) {
                // if there is enough space on right side of current mouse position, always display tooltip to the right side
                position.left = mousePositionX + offset;
            } else {
                // otherwise display tooltip to the left side
                position.right = clientWidth - mousePositionX - offset;
            }

            if (
                clientHeight - mousePositionY >
                this.tooltipEl.clientHeight + 2 * offset
            ) {
                // if there is enough space below current mouse position, always display tooltip blow pointer
                position.top = mousePositionY + offset;
            } else {
                // otherwise display tooltip above pointer
                position.top =
                    mousePositionY - offset - this.tooltipEl.clientHeight;
            }

            this.setState({
                position
            });
        }
    }
}
