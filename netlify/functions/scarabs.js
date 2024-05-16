// interface Ratio {
// 	itemName: string
// 	necropolisValue: number
// 	standardValue: number
// 	valueRatio: number
// }

// type valuesRatio = Ratio[]

export const handler = async () => {
	const necropolisResponse = await fetch(
		'https://poe.ninja/api/data/itemoverview?league=Necropolis&type=Scarab'
	)
	const standardResponse = await fetch(
		'https://poe.ninja/api/data/itemoverview?league=Standard&type=Scarab'
	)

	const necropolis = await necropolisResponse.json()
	const standard = await standardResponse.json()

	const resultNecropolis = []
	const resultStandard = []

	necropolis.lines.forEach(line => {
		resultNecropolis.push({
			currencyTypeName: line.name,
			receive: {
				value: line.chaosValue ? line.chaosValue : 0,
			},
		})
	})

	standard.lines.forEach(line => {
		resultStandard.push({
			currencyTypeName: line.name,
			receive: {
				value: line.chaosValue ? line.chaosValue : 0,
			},
		})
	})

	const ratio = []

	resultNecropolis.forEach(item => {
		const standardItem = resultStandard.find(
			i => i.currencyTypeName === item.currencyTypeName
		)
		if (standardItem) {
			ratio.push({
				itemName: item.currencyTypeName,
				necropolisValue: item.receive.value,
				standardValue: standardItem.receive.value,
				valueRatio: standardItem.receive.value / item.receive.value,
			})
		}
	})
	ratio.sort((a, b) => b.valueRatio - a.valueRatio)
	const result = {
		necropolis: resultNecropolis,
		standard: resultStandard,
		valueRatio: ratio,
	}

	return {
		statusCode: 200,
		body: JSON.stringify(result),
	}
}
