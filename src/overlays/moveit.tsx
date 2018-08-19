// TODO: extract as external module

import * as React from 'react';

interface MoveItProps {
    onMove: any;
}

export class MoveIt extends React.Component<MoveItProps> {

    private oldX: number;
    private node: any;

    private onMouseDown = (e) => {
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);

        this.oldX = e.clientX;
    }

    private onMouseMove = (e) => {
        const oldX = this.oldX;
        const x = e.clientX;
        
        if (this.node) {
            const w = this.node.offsetWidth;
            const diff = (oldX - x) / w;

            console.log('diff', diff);
            this.props.onMove(diff);
        }

        this.oldX = x;
    }

    private onMouseUp = (e) => {
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    }
    public render() {
        return <div style={{
            cursor: 'move',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: 'rgba(0, 200, 0, .3)',
        }}
            onMouseDown={this.onMouseDown}
            ref={node => this.node = node}
        />
    }
}