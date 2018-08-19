// TODO: extract as external module

import * as React from 'react';

interface MoveItProps {
    onMove: any;
}

export class MoveIt extends React.Component<MoveItProps> {

    private oldX: number;
    private oldY: number;
    private node: any;

    private onMouseDown = (e) => {
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);

        this.oldX = e.clientX;
        this.oldY = e.clientY;
    }

    private onMouseMove = (e) => {
        const oldX = this.oldX;
        const oldY = this.oldY;
        const x = e.clientX;
        const y = e.clientY;
        
        if (this.node) {
            const w = this.node.offsetWidth;
            const h = this.node.offsetHeight;
            const diffX = (oldX - x) / w;
            const diffY = (oldY - y) / h;

            this.props.onMove(diffX, diffY);
        }

        this.oldX = x;
        this.oldY = y;
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