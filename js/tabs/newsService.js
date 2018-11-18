class NewsService {
  constructor(apiKey, config) {
    this.config = config;

    this.tabBuilder = new TabBuilder(this.config);
    this.requestClient = new RequestClient(apiKey);

    this.handleRequestEvents();
    this.bindTabBuilderToRequests();
    this.selectFirstTab();
  }

  selectFirstTab() {
    this.tabBuilder.selectFirstTab();
  }

  bindTabBuilderToRequests() {
    this.tabBuilder.buttons.childNodes.forEach(button => {
      if (button.id) {
        this.tabBuilder.handleClick(button, this.requestClient.fetchNews.bind(this.requestClient, button.id));
      }
    });
  }

  handleRequestEvents() {
    this.handleRequestStart();
    this.handleRequestComplete();
  }

  handleRequestStart() {
    document.addEventListener('requestStart', this.onRequestStart.bind(this));
  }

  handleRequestComplete() {
    document.addEventListener('requestComplete', this.onRequestComplete.bind(this));
  }

  onRequestStart() {
    this.tabBuilder.addLoader();
  }

  onRequestComplete(event) {
    event.detail.then((response) => {
      this.tabBuilder.clearContent();
      this.tabBuilder.fillContent(response.articles);
    })
  }
  
}