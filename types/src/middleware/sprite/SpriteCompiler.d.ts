import { BufferGeometry, Sprite, SpriteMaterial } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, SolidObjectCompilerTarget } from "../solidObject/SolidObjectCompiler";
import { SpriteConfig } from "./SpriteConfig";
export interface SpriteCompilerTarget extends SolidObjectCompilerTarget<SpriteConfig> {
    [key: string]: SpriteConfig;
}
export declare class SpriteCompiler extends SolidObjectCompiler<SpriteConfig, SpriteCompilerTarget, Sprite> {
    MODULE: MODULETYPE;
    private replaceMaterial;
    private replaceGeometry;
    constructor();
    getReplaceMaterial(): SpriteMaterial;
    getReplaceGeometry(): BufferGeometry;
    /**
     * @override
     */
    protected setLookAt(vid: string, target: string): this;
    /**
     * @override
     */
    protected getMaterial(vid: string): SpriteMaterial;
    add(vid: string, config: SpriteConfig): this;
    dispose(): this;
}