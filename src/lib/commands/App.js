import Compose from '../ComposeHelper';
import Template from '../TemplateHelper';

export default class App {

  static create(source, dest, context) {
    Template.generate(source, dest, context);
  }

  static up(options) {
    Compose.up(options);
  }

  static test(options) {
    Compose.up(options);
  }

  static debug(options) {
    Compose.up(options);
  }

  static production(options) {
    Compose.up(options);
  }
}
