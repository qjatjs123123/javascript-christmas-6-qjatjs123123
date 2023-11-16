class HttpRequest {
  #restfulAPI;
  #body;

  constructor(restfulAPI, body) {
    this.#restfulAPI = restfulAPI;
    this.#body = body;
  }

  getHttpRequest() {
    return {
      restfulAPI: this.#restfulAPI,
      body: this.#body,
    };
  }
}

export default HttpRequest;
