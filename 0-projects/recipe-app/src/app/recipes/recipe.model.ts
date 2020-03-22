export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(data: Recipe) {
    const { name, description, imagePath } = data;

    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}
