import { ThemeProvider } from "emotion-theming"
import theme from "@rebass/preset"
import { Provider, rootStore } from "./models"
import { CardBoard } from "./components/CardBoard"
import { Panel } from "./components/Panel"

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Provider value={rootStore}>
				<CardBoard />
				<Panel />
			</Provider>
		</ThemeProvider>
	)
}

export default App
