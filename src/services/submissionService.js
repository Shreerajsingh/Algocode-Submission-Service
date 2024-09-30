const SubmissionProducer = require("../producers/submissionQueueProducer");

class SubmissionService {
    constructor(submissionRespository) {
        //inject
        this.submissionRespository = submissionRespository;
    }

    async pingCheck() {
        return "pong";
    }

    async addSubmission(submission) {
        const submission_ = await this.submissionRespository.createSubmission(submission);
        if(!submission_) {
            // Pending task: 'Add Error Handler';
            return {message: "Not able to create submission"}
        }
        const response = await SubmissionProducer(submission);
        console.log(response);
        return {queueResponse: response, submission_};
    }
}

module.exports = SubmissionService;