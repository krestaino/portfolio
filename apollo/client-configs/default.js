import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (contex) => {
  const uri = contex.isDev ? process.env.API_DEV : process.env.API_PROD
  const link = new HttpLink({ uri: uri + '/graphql' })
  return {
    link,
    cache: new InMemoryCache()
  }
}
