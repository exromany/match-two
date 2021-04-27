import { useEffect, useState } from "react"
import { Box, Button, Text } from "rebass"
import { observer } from "mobx-react-lite"
import { useMst } from "../../models/index"
import { formatTime } from "./formatTime"

export const Panel = observer(() => {
	const { moves, startedTime, finishedTime, restart } = useMst()
	const [timeLeft, setTimeLeft] = useState(0)

	useEffect(() => {
		if (!startedTime || finishedTime) {
			return
		}

		const intervalId = setInterval(() => {
			const ms = Date.now() - startedTime
			setTimeLeft(ms)
		}, 200)

		return () => clearInterval(intervalId)
	}, [startedTime, finishedTime])

	useEffect(() => {
		if (startedTime && finishedTime) {
			const ms = finishedTime - startedTime
			setTimeLeft(ms)
		} else {
			setTimeLeft(0)
		}
	}, [startedTime, finishedTime])

	return (
		<Box p={2}>
			<Box>
				<Text>time: {formatTime(timeLeft)}</Text>
			</Box>
			<Box>
				<Text>moves: {moves}</Text>
			</Box>
			{finishedTime && (
				<Box>
					<Button variant='primary' onClick={restart}>
						Start again
					</Button>
				</Box>
			)}
		</Box>
	)
})
