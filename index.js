import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const url='https://console.jumpcloud.com/api/systemusers'
const config = {
	headers: {
		"x-api-key": process.env.apiKey
	}
}
const main = async () => {
	const users = (await axios.get(url,config)).data.results
	return Promise.all(users.map(u => {
		console.log(`${u.firstname} ${u.lastname}`)
		return axios.put(`${url}/${u.id}`,{"externally_managed": false, },config)
	}))
}

try {
	const res = await main()

} catch(e) {
	console.log(e)
}
