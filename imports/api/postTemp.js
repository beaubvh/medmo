import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import express from 'express';
import bodyParser from 'body-parser';
import moment from 'moment-timezone';
import { Temp } from '/imports/api/temp';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
WebApp.connectHandlers.use(Meteor.bindEnvironment(app));

app.post('/api/temp', Meteor.bindEnvironment((req, res) => {
		let temp = parseFloat(req.body.temp);
		let authToken = req.body.token;
		let Bangkok = moment().tz("Asia/Bangkok").format();

		if (authToken != '65beb48699b1e32986c50ee01fc1f4d3a0343f133cfff657b584863035bb14d3') {
			console.log('Authenticaion Failed!');
			res.send('Reseponse from Server: Authenticaion Failed!');
		} else {
			console.log('Current Temperature : ' + temp + '°C')
			res.send('Response from Server: Current Temperature : ' + temp + '°C')
			Temp.insert({ 
				temp: temp,
				created_on: Bangkok 
			});	
			res.end('OK');
		}
	}));

//65beb48699b1e32986c50ee01fc1f4d3a0343f133cfff657b584863035bb14d3