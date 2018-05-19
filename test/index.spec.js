'use strict';

/* eslint-disable no-console, max-nested-callbacks, global-require */

const proxyquire = require('proxyquire').noPreserveCache();
const fetch = require('./lib/fetch');
const stubs = {
  'node-fetch': fetch
};

let google;
let resetData;

/**
 * 区分"线上测试"和"集成测试"
 */
if (process.env.NODE_ENV === 'testing') {
  google = proxyquire('../index.js', stubs);
  resetData = fetch.resetData;
} else {
  google = require('../index.js');
  resetData = () => {
    // do nothing
  };
}

const mocha = require('mocha');
const chai = require('chai');
const Joi = require('joi');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);
