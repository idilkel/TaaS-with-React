class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    tasks: "https://raw.githubusercontent.com/KobiShashs/TODO-JSON/main/tasks",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    tasks: "www.aws.com/website/tasks",
  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;
