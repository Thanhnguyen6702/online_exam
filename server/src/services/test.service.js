const httpStatus = require('http-status');
const { Test, AnswerSheet } = require('../models');
const answerSheetService = require('./answerSheet.service');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

/**
 * Create a test
 * @param {Object} testBody
 * @returns {Promise<Test>}
 */
const createTest = async (testBody) => {
    //   if (await Test.isEmailTaken(testBody.email)) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    //   }
    return Test.create(testBody);
};

/**
 * Query for tests
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTests = async (filter, options) => {
    if (filter.name) filter.name = { $regex: filter.name, "$options": "i" };
    if (filter.tags) tags = { $all: filter.tags.split(",") };
    console.log(filter);
    const tests = await Test.paginate(filter, options);
    return tests;
};

const detectNullTests = async (ids) => {
    let foundTests = await Test.find({ _id: { $in: ids } });
    foundTests = foundTests.map(v => v._id.toString());
    return ids.filter(id => !foundTests.includes(id));
}

/**
 * Get test by id
 * @param {ObjectId} id
 * @returns {Promise<Test>}
 */
const getTestById = async (id, options) => {
    let testPromise = Test.findById(id);
    if (options?.populate) {
        options.populate.split(',').forEach((populateOption) => {
            testPromise = testPromise.populate(
                populateOption
                    .split('.')
                    .reverse()
                    .reduce((a, b) => ({ path: b, populate: a }))
            );
        });
    }

    testPromise = testPromise.exec();

    return testPromise;
};

/**
 * Get test by email
 * @param {string} email
 * @returns {Promise<Test>}
 */
const getTestByEmail = async (email) => {
    return Test.findOne({ email });
};

const getTestKey = async (testId) => {
    const test = await getTestById(testId, { populate: "questions" });
    if (!test) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Test not found');
    }
    const key = test.getKey();
    return key;
}