class HttpRequest {
  #restfulAPI;
  #inputData;

  constructor(restfulAPI, inputData) {
    this.#restfulAPI = restfulAPI;
    this.#inputData = inputData;
  }

  get restfulAPI() {
    return this.#restfulAPI;
  }

  get inputData() {
    return this.#inputData;
  }
}

export default HttpRequest;
