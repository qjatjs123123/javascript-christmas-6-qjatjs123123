class HttpResponse {
  #status;
  #responseData;

  constructor(status, message) {
    this.#status = status;
    this.#responseData = message;
  }

  get status() {
    return this.#status;
  }

  get responseData() {
    return this.#responseData;
  }
}

export default HttpResponse;
