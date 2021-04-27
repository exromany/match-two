import { types } from "mobx-state-tree"
import { getValues } from "./values"
import { Tile } from "./Tile"

export const Game = types
	.model({
		tiles: types.optional(types.array(Tile), getValues()),
		moves: 0,
		startedTime: types.maybeNull(types.Date),
		finishedTime: types.maybeNull(types.Date),
		openedTileIndex: types.maybeNull(types.number),
		closeTimer: types.maybeNull(types.number),
		hideTimer: types.maybeNull(types.number),
	})
	.actions((self) => ({
		restart() {
			self.tiles = getValues()
			self.moves = 0
			self.startedTime = null
			self.finishedTime = null
			self.openedTileIndex = null
			clearTimeout(self.closeTimer)
			clearTimeout(self.hideTimer)
		},
		match(tile) {
			if (!self.startedTime) {
				self.startedTime = Date.now()
			}
			if (self.openedTileIndex === null) {
				self.openedTileIndex = self.tiles.indexOf(tile)
				self.closeAll(tile)
				return
			}
			const opened = self.tiles[self.openedTileIndex]
			if (opened === tile) {
				return
			}
			self.moves += 1
			self.openedTileIndex = null
			if (tile.value === opened.value) {
				tile.matched = true
				opened.matched = true
				self.checkFinal()
				self.hideTimer = setTimeout(self.hideMatched, 500)
			} else {
				self.closeTimer = setTimeout(self.closeAll, 1500)
			}
		},
		closeAll(except) {
			clearTimeout(self.closeTimer)
			self.tiles.filter((tile) => tile !== except).forEach((tile) => tile.close())
		},
		hideMatched() {
			self.tiles.filter((tile) => tile.matched).forEach((tile) => tile.hide())
		},
		checkFinal() {
			if (!self.finishedTime && self.tiles.every(({ matched }) => matched)) {
				self.finishedTime = Date.now()
			}
		},
	}))
