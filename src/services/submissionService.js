const fetchProblemDetails = require("../apis/problemApi");
const SubmissionProducer = require("../producers/submissionQueueProducer");

class SubmissionService {
    constructor(submissionRepository) {
        //inject
        this.submissionRepository = submissionRepository;
    }

    async pingCheck() {
        return "pong";
    }

    async addSubmission(submissionPayload) {
        const problemId = submissionPayload.problemId;
        const problemAdminApiResponse = await fetchProblemDetails(problemId);

        if(!problemAdminApiResponse) {
            // Pending task: 'Add Error Handler';
            return {message: "Not able to create the submission"}
        }

        const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(codestub => (codestub.language.toLowerCase() === submissionPayload.language.toLowerCase()));

        console.log(languageCodeStub);

        submissionPayload.code = languageCodeStub.startSnippet + "\n\n" + submissionPayload.code + "\n\n" + languageCodeStub.endSnippet;

        const submission = await this.submissionRepository.createSubmission(submissionPayload);
        console.log(">>", submission);
        if(!submission) {
            // Pending task: 'Add Error Handler';
            return {message: "Not able to create the submission"}
        }

        const response = await SubmissionProducer({
            [submission._id]: {
                code: submission.code,
                language: submission.language,
                inputTestCase: problemAdminApiResponse.data.testCases[0].input,
                outputTestCase: problemAdminApiResponse.data.testCases[0].output
            }
        });

        console.log(response);

        return {queueResponse: response, submission};
    }
}

module.exports = SubmissionService;