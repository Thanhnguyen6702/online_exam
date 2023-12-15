const httpStatus = require('http-status');
const { Course, AnswerSheet } = require('../models');
const answerSheetService = require('./answerSheet.service');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

/**
 * Create a course
 * @param {Object} courseBody
 * @returns {Promise<Course>}
 */
const createCourse = async (courseBody) => {
    return Course.create(courseBody);
};

/**
 * Query for courses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCourses = async (filter, options) => {
    if (filter.name) filter.name = { $regex: filter.name, "$options": "i" };
    if (filter.tags) tags = { $all: filter.tags.split(",") };
    const courses = await Course.paginate(filter, options);
    return courses;
};

/**
 * Get course by id
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 */
const getCourseById = async (id, options) => {
    let coursePromise = Course.findById(id);
    if (options?.populate) {
        options.populate.split(',').forEach((populateOption) => {
            coursePromise = coursePromise.populate(
                populateOption
                    .split('.')
                    .reverse()
                    .reduce((a, b) => ({ path: b, populate: a }))
            );
        });
    }

    coursePromise = coursePromise.exec();

    return coursePromise;
};

/**
 * Get course by email
 * @param {string} email
 * @returns {Promise<Course>}
 */
const getCourseByEmail = async (email) => {
    return Course.find({ email });
};

const getCourseKey = async (courseId) => {
    const course = await getCourseById(courseId, { populate: "questions" });
    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }
    const key = course.getKey();
    return key;
}