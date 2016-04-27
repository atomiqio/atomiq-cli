'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newProject = newProject;

var _inquirer = require('inquirer');

function newProject(context) {
  var projectType, projectName, choices;
  return regeneratorRuntime.async(function newProject$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          projectType = {
            name: 'type',
            type: 'list',
            message: 'type',
            choices: ['api', 'app', 'lib'],
            default: 'api'
          };
          projectName = {
            name: 'name',
            type: 'input',
            message: 'name',
            // use project type from previous questions as default project name
            default: function _default(answers) {
              return answers.type;
            }
          };
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _inquirer.prompt)([projectType, projectName]));

        case 4:
          choices = _context.sent;


          context.type = choices.type;
          context.name = choices.name;

          return _context.abrupt('return', context);

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
}
//# sourceMappingURL=prompt.js.map