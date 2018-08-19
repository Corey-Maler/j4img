export type ImagePlacement = 'full' | 'left';

export type Action = () => void;

export interface Vec2 {
    x: number;
    y: number;
}

export interface ResizeObject {
    scale: number | Vec2;
    offset: Vec2;
    rotation: number;
}

export interface Changes {
    resize: ResizeObject,
    color: {
        brightness: number,
    }
}