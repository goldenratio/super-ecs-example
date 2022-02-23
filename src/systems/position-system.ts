import { System, TickerDataLike } from 'super-ecs';

import { SpriteComponent } from '../components/sprite-component';
import { PositionComponent } from '../components/position-component';
import { COMPONENT_NAMES } from '../components/types';

export class PositionSystem extends System {
	update(tickerData: TickerDataLike): void {
		const entities = this.world.getEntities([COMPONENT_NAMES.PositionComponent, COMPONENT_NAMES.SpriteComponent]);
		if (entities.length === 0) {
			return;
		}

		entities.forEach(entity => {
			const positionComponent = entity.getComponent<PositionComponent>(COMPONENT_NAMES.PositionComponent);
			const spriteComponent = entity.getComponent<SpriteComponent>(COMPONENT_NAMES.SpriteComponent);

			if (positionComponent && spriteComponent) {
				const { sprite } = spriteComponent;
				sprite.position.set(positionComponent.x, positionComponent.y);
			}
		});
	}
}
