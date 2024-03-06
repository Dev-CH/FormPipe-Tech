import Client from './Client/client'
import UserController from './User'

class Api {
  readonly #client: Client

  user: UserController

  constructor() {
    this.#client = new Client()

    this.user = new UserController(this.#client)
  }
}

export default Api
export * from './types'
