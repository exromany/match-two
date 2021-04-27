const VALUES_LENGTH = 36
export const VALUES = Array.from(
	{ length: VALUES_LENGTH },
	(v, i) => `${(i % (VALUES_LENGTH / 2)) + 1}`
)

export const shuffle = (array) => {
	const result = [...array]
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[result[i], result[j]] = [result[j], result[i]]
	}
	return result
}

export const getValues = () => shuffle(VALUES).map((value) => ({ value }))
