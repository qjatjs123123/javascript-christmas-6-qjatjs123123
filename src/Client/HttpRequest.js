class HttpRequest {
  #restfulAPI;
  #body;

  constructor(restfulAPI, inputData) {
    this.#restfulAPI = restfulAPI;
    this.#body = inputData;
  }

  get restfulAPI() {
    return this.#restfulAPI;
  }

  get body() {
    return this.#body;
  }
}

export default HttpRequest;
