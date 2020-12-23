class User {
  private name: string;
  private email: string;
  private platform: string;

  constructor(name: string, email: string, platform: string) {
    this.name = name;
    this.email = email;
    this.platform = platform;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPlatform(): string {
    return this.platform;
  }
}
