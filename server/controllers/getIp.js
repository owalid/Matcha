import https from "https";
import { verifParams } from "../utils/verifParams";
var NodeGeocoder = require('node-geocoder');
const request = require('request');

require('dotenv').config();
export const getIpAddress = async (req, res) => {
    request('http://ip-api.com/json/?fields=61439', { json: true }, (err, response, body) => {
        if (err) { return res.status(500).json({ error: err }); }
        return res.status(200).json({ lat: body.lat, long: body.lon });
    });
}

export const getCoordinatePlace = async (req, res) => {
    if (verifParams(req.params, 1)) {
        var geocoder = NodeGeocoder({
            provider: 'opencage',
            apiKey: process.env.GEOCODER_KEY
          });
          geocoder.geocode(req.params.place, function(err, result) {
            if (err) { return res.status(500).json({ error: err }); }
            return res.status(200).json({res: result[0]});
          });
    }
    else {
        console.log("error ? ", req.params, req.body)
    }
}

