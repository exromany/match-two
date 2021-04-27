import { useContext, createContext } from "react"
import { Game } from "./Game"

export const rootStore = Game.create()

const RootStoreContext = createContext(null)

export const Provider = RootStoreContext.Provider

export function useMst() {
	const store = useContext(RootStoreContext)
	if (store === null) {
		throw new Error("Store cannot be null, please add a context provider")
	}
	return store
}
