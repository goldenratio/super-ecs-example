import { Sprite } from 'pixi.js';
import { Component, ComponentProps } from 'super-ecs';

export class SpriteComponent implements Component {
	public static TYPE: symbol = Symbol('SpriteComponent');
	public name: symbol = SpriteComponent.TYPE;
	public sprite: Sprite;

	constructor(props?: ComponentProps<SpriteComponent>) {
		const { sprite = new Sprite() } = props || {};
		this.sprite = sprite;
	}
}
