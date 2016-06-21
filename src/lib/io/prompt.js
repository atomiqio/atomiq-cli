import { prompt } from 'inquirer'

export async function newProject(context) {
  let projectType = {
    name: 'type',
    type: 'list',
    message: 'type',
    choices: ['api', 'app', 'lib'],
    default: 'api'
  }

  let projectName = {
    name: 'name',
    type: 'input',
    message: 'name',
    // if no name option, use project type from previous questions as default project name
    default: context.name ? context.name : answers => answers.type
  }

  let choices = await prompt([
    projectType,
    projectName
  ])

  context.type = choices.type
  context.name = choices.name

  return context
}
