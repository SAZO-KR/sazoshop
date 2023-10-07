import ProductAttribute from './ProductAttribute';

export default class ProductAttributeBuilder {
  attr: ProductAttribute;

  constructor(id: string) {
    this.attr = new ProductAttribute(id);
  }

  name(name: string) {
    this.attr.name = name;
    return this;
  }

  translatedName(translatedName: string) {
    this.attr.translatedName = translatedName;
    return this;
  }

  dependency(dependency: string[]) {
    this.attr.dependency = dependency;
    return this;
  }

  price(price: number) {
    this.attr.price = price;
    return this;
  }

  imageURL(imageURL: string) {
    this.attr.imageURL = imageURL;
    return this;
  }

  build() {
    return this.attr;
  }
}
