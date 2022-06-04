import scrape from 'scrape-it'
import {writeFileSync, existsSync, mkdirSync} from 'fs'

const {stringify} = JSON

async function init(){
	let {data} = await scrape('https://harga-emas.org/', {
		beli: '.in_table:nth-child(2) tr:nth-child(14) > td:nth-child(2)',
		jual: 'strong:nth-child(3)',
		update: 'tr:nth-child(16) > td:nth-child(2) > strong:nth-child(1)'
	})

	data.beli = data.beli.split(' (')[0]
	data.jual = data.jual.replace('Rp. ', '').split('/')[0]

	if (!existsSync('dist')){
		mkdirSync('dist')
	}
	writeFileSync('dist/data.json', stringify(data))
}
init()