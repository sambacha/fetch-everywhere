"use strict";

import '../fetch-npm-node';
import { expect } from 'chai';
import nock from 'nock';

let handleErrors = (response) => {
	if (!response.ok) throw Error(response.statusText);
	return response;
};

describe('Fetch test', () => {
	before(() => {
		nock('https://mattandre.ws')
			.get('/succeed')
			.reply(200, 'GoodResponse');
		
		nock('https://mattandre.ws')
			.get('/fail')
			.reply(404, 'BadResponse');
	});
	
	it('Should be defined', () => {
		expect(fetch).to.be.a('function');
	});
	
	/* jshint ignore:start */
	it('should facilitate the making of request', async () => {
		let response = await fetch('https://mattandre.ws/succeed')
														.then(handleErrors)
														.catch();

		expect(response.status).to.equal(200);
		expect(await response.text()).to.equal('GoodResponse');
	});
	
	it('should do the right thing with bad requests', async () => {
		let response = await fetch('https://mattandre.ws/fail')
													 .then(handleErrors)
													 .catch((err) => {
													 	 return err;
													 });
		
		expect(response.toString()).to.equal('Error: Not Found');
	});
		/* jshint ignore:end */
});
