import { getParent, types } from "mobx-state-tree"

export const Tile = types
	.model({
		value: types.string,
		opened: false,
		matched: false,
		visible: true,
	})
	.actions((self) => ({
		open() {
			self.opened = true
			getParent(self, 2).match(self)
		},
		close() {
			self.opened = false
		},
		hide() {
			self.visible = false
		},
	}))
