// interface Ratio {
// 	itemName: string
// 	necropolisValue: number
// 	standardValue: number
// 	valueRatio: number
// }

// type valuesRatio = Ratio[]

export const handler = async (event, context) => {
	const type = event.queryStringParameters.slug
	let slug = ''
	if (type == 'Currency' || type == 'Fragment') {
		slug = 'currencyoverview'
	} else {
		slug = 'itemoverview'
	}
	const necropolisResponse = await fetch(
		`https://poe.ninja/api/data/${slug}?league=Necropolis&type=${type}`
	)
	const standardResponse = await fetch(
		`https://poe.ninja/api/data/${slug}?league=Standard&type=${type}`
	)

	const necropolis = await necropolisResponse.json()
	const standard = await standardResponse.json()

	console.log(standardResponse.url)
	const resultNecropolis = []
	const resultStandard = []

	necropolis.lines.forEach(line => {
		resultNecropolis.push({
			currencyTypeName: line.currencyTypeName
				? line.currencyTypeName
				: line.name,
			receive: {
				value: line.chaosEquivalent ? line.chaosEquivalent : line.chaosValue,
			},
		})
	})

	standard.lines.forEach(line => {
		resultStandard.push({
			currencyTypeName: line.currencyTypeName
				? line.currencyTypeName
				: line.name,
			receive: {
				value: line.chaosEquivalent ? line.chaosEquivalent : line.chaosValue,
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
