import * as print from '../io/print'
import Compose from '../ComposeHelper'
import path from 'path'
import Shell from '../ShellHelper'
import Template from '../TemplateHelper'

const spawnopts = {
  env: process.env,
  stdio: 'inherit'
}

export default class App {

  static create(source, dest, context) {
    if (Shell.exists(path.join(dest, context.name))) {
      throw new Error('Destination already exists (will not overwrite)')
    }
    Template.generate(source, dest, context)
  }

  static up(options) {
    Compose.up(spawnopts)
  }

  static test(options) {
    Compose.test(spawnopts)
  }

  static debug(options) {
    Compose.debug(spawnopts)
  }

  static production(options) {
    Compose.production(spawnopts)
  }

  static url(options) {
    let active,
      host,
      port,
      url

    try {
      active = Shell.exec('docker-machine active').toString('utf8').trim()
    } catch (err) {
      throw new Error('Make sure that you have set your environment for Docker.')
    }

    try {
      host = Shell.exec(`docker-machine ip ${active}`).toString('utf8').trim()
    } catch (err) {
      throw new Error('Unable to determine machine IP.')
    }

    try {
      port = Shell.exec('docker-compose port web 3000').toString('utf8').split(':')[1].trim()
    } catch (err) {
      throw new Error('Make sure you are in the app root and that a container is running.')
    }

    try {
      url = `${host}:${port}`
      print.ln(url)
    } catch (err) {
      print.error(err)
      throw new Error('Make sure that a container is running first.')
    }
  }
}
