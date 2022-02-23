import { Entity, System, World } from 'super-ecs';

import { SpriteComponent } from '../components/sprite-component';
import { COMPONENT_NAMES } from '../components/types';
import { DisposeBag } from '../utils/dispose-bag';

export class SceneSystem extends System {
	private readonly _container: PIXI.Container;
	private _disposeBag?: DisposeBag;

	constructor(container: PIXI.Container) {
		super();
		this._container = container;
	}

	removedFromWorld(world: World): void {
		super.removedFromWorld(world);
	}

	addedToWorld(world: World): void {
		super.addedToWorld(world);

		this._disposeBag = new DisposeBag();

		this._disposeBag.completable$(world.entityAdded$([COMPONENT_NAMES.SpriteComponent])).subscribe((entity: Entity) => {
			const spriteComponent = entity.getComponent<SpriteComponent>(COMPONENT_NAMES.SpriteComponent);
			if (!spriteComponent) {
				return;
			}

			const { sprite } = spriteComponent;
			if (sprite) {
				this._container.addChild(sprite);
			}
		});

		this._disposeBag
			.completable$(world.entityRemoved$([COMPONENT_NAMES.SpriteComponent]))
			.subscribe((entity: Entity) => {
				const spriteComponent = entity.getComponent<SpriteComponent>(COMPONENT_NAMES.SpriteComponent);
				if (!spriteComponent) {
					return;
				}

				const { sprite } = spriteComponent;
				if (sprite) {
					this._container.removeChild(sprite);
				}
			});
	}
}
