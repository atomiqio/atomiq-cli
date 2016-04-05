import Compose from '../ComposeHelper';
import Template from '../TemplateHelper';

export default class App {

  static create(source, dest, context) {
    Template.generate(source, dest, context);
  }

}
