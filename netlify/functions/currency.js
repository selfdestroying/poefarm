// interface Ratio {
// 	itemName: string
// 	necropolisValue: number
// 	standardValue: number
// 	valueRatio: number
// }

// type valuesRatio = Ratio[]

export const handler = async () => {
	const necropolisResponse = await fetch(
		'https://poe.ninja/api/data/currencyoverview?league=Necropolis&type=Currency'
	)
	const standardResponse = await fetch(
		'https://poe.ninja/api/data/currencyoverview?league=Standard&type=Currency'
	)

	const necropolis = await necropolisResponse.json()
	const standard = await standardResponse.json()

	const resultNecropolis = []
	const resultStandard = []

	necropolis.lines.forEach(line => {
		resultNecropolis.push({
			currencyTypeName: line.currencyTypeName,
			receive: {
				value: line.receive ? line.receive.value : 0,
			},
		})
	})

	standard.lines.forEach(line => {
		resultStandard.push({
			currencyTypeName: line.currencyTypeName,
			receive: {
				value: line.chaosEquivalent ? line.chaosEquivalent : 0,
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
