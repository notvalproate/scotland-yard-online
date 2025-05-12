import { Injectable } from '@angular/core';
import { Texture } from '../interfaces/texture.interface';

@Injectable({
    providedIn: 'root',
})
export class TextureService {
    private textureMap: Map<string, Texture> = new Map<string, Texture>();

    // Load All Textures Here
    constructor() {
        this.loadTexture('map', 'images/map.webp')
    }

    get(identifier: string): Texture | undefined {
        return this.textureMap.get(identifier);
    }

    private loadTexture(identifier: string, src: string) {
        const img = new Image();
        img.src = src;
        this.textureMap.set(identifier, {
            path: img.src,
            image: img,
            dimensions: {
                x: 0,
                y: 0
            },
            loaded: false,
            onLoad: null
        });
        img.onload = () => this.updateTexture(identifier);
    }

    private updateTexture(identifier: string) {
        let tex = this.textureMap.get(identifier)!;
        tex.dimensions = {
            x: tex.image.width,
            y: tex.image.height
        }
        tex.loaded = true;
        if(tex.onLoad) {
            tex.onLoad();
        }
    }
}
