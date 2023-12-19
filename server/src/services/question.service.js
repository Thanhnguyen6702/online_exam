const httpStatus = require("http-status");
const { Question } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a question
 * @param {Object} questionBody
 * @returns {Promise<Question>}
 */
const createQuestion = async (questionBody) => {
  return Question.create(questionBody);
};

const createQuestions = async (body) => {
  return Question.insertMany(body)
}

/**
 * Query for questions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQuestions = async (filter, options) => {
  if (filter.query) {
    filter.question = { $regex: filter.query, $options: "i" };
    // const regex = new RegExp(`${filter.query}`)
  }
  delete filter.query;
  delete filter.isSolved;
  if (filter.tags) filter.tags = { $all: filter.tags.split(",") };
  // if (filter.isSolved)
  //   filter["$expr"] = { $gt: [{ $strLenCP: "$answer" }, 10] };
  console.log(filter);
  const questions = await Question.paginate(filter, options);
  return questions;
};