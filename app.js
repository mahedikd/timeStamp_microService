const express = require('express');
const dayjs = require('dayjs');
const cors = require('cors');


const { log } = console;
const app = express();

app.use(express.static('static'));
app.use(cors({ optionsSuccessStatus: 200 }));


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
})

// api handeler
app.get('/api/:date', async (req, res) => {

	const temp = req.params.date;
	const result = await timestmp(temp);
	res.json(result);

	log({temp});
})

// handels empty api request 
app.get('/api', async (req, res) => {

	const temp = Date.now();
	const result = await timestmp(temp);
	res.json(result);
})

// main func
async function timestmp(tm) {

	const time = (/(\d){10}/g).test(tm) ? Number(tm) : tm;
	const newtime = dayjs(time);

	if (isNaN(newtime)) {
		return { error: 'Invalid Date' };
	}
	const unix = Date.parse(newtime);
	const utc = `${newtime}`;

	return { unix, utc };
}

var listener = app.listen(process.env.PORT, function() {
	log('app is listening on port ' + listener.address().port);
});
