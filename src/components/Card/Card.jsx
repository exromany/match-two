import { Flex } from "rebass"
import { CardClosed } from "./CardClosed"
import { CardOpened } from "./CardOpened"

export const Card = ({ value, opened, matched, visible, onClick }) => {
	return (
		<Flex
			sx={{
				height: 80,
				borderRadius: 4,
				boxShadow: visible ? "0 0 2px rgba(0, 0, 0, .125)" : undefined,
				alignItems: "center",
				justifyContent: "center",
				overflow: "hidden",
				cursor: visible ? "pointer" : undefined,
				userSelect: "none",
				color: matched ? "red" : "black",
			}}
			onClick={onClick}
		>
			{visible && (opened ? <CardOpened value={value} /> : <CardClosed />)}
		</Flex>
	)
}
