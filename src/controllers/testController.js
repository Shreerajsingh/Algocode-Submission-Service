async function testRequest(req, res) {
    console.log(this.testService);
    const response = await this.testService.pingCheck();
    return res.send({message: response});
}

module.exports = testRequest;