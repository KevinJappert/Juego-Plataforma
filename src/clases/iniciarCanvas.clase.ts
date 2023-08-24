export class iniciarCanvas {

    static initCanvas( width: number, height: number): HTMLCanvasElement {
        const canvas = document.querySelector('#mi-canvas') as HTMLCanvasElement;
        if (!canvas) {  
            throw new Error('Canvas element not found');
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('2D context not supported');
        }

        canvas.width = width;
        canvas.height = height;

        return canvas;
    }
}