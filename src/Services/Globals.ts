class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    // tasks: "https://raw.githubusercontent.com/KobiShashs/TODO-JSON/main/tasks",
    tasks: "http://localhost:8080/api/tasks/",
    welcome: "http://localhost:8080/api/welcome/",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    tasks: "www.aws.com/website/tasks",
    welcome: "www.aws.com/webSite/welcome/",
  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;
