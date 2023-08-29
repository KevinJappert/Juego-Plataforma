export class iniciarCanvas {

    static iniciar( anchoX: number, altoY: number): HTMLCanvasElement {
        const canvas = document.querySelector('#mi-canvas') as HTMLCanvasElement;
        if (!canvas) {  
            throw new Error('Canvas element not found');
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('2D context not supported');
        }

        canvas.width = anchoX;
        canvas.height = altoY;

        return canvas;
    }
}