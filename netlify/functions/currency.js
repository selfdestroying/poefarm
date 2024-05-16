// interface Ratio {
// 	itemName: string
// 	necropolisValue: number
// 	standardValue: number
// 	valueRatio: number
// }

// type valuesRatio = Ratio[]

export const handler = async () => {
	let necropolis = await fetch(
		'https://poe.ninja/api/data/currencyoverview?league=Necropolis&type=Currency'
	)
	let standard = await fetch(
		'https://poe.ninja/api/data/currencyoverview?league=Standard&type=Currency'
	)

	necropolis = await necropolis.json()
	standard = await standard.json()

	const resultNecropolis = []
	const resultStandard = []

	necropolis.data.lines.forEach(line => {
		resultNecropolis.push({
			currencyTypeName: line.currencyTypeName,
			receive: {
				value: line.receive ? line.receive.value : 0,
			},
		})
	})

	standard.data.lines.forEach(line => {
		resultStandard.push({
			currencyTypeName: line.currencyTypeName,
			receive: {
				value: line.receive ? line.receive.value : 0,
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
