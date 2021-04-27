import { Flex, Box } from "rebass"
import { observer } from "mobx-react-lite"
import { Card } from "../Card"
import { useMst } from "../../models"

export const CardBoard = observer(() => {
	const { tiles } = useMst()

	return (
		<Flex flexWrap='wrap'>
			{tiles.map((tile, index) => (
				<Box key={`${tile.value}-${index}`} width={1 / 6} p={2}>
					<Card
						value={tile.value}
						opened={tile.opened}
						matched={tile.matched}
						visible={tile.visible}
						onClick={() => tile.open()}
					/>
				</Box>
			))}
		</Flex>
	)
})
