import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (ctx) => {
  const uri = ctx.isDev ? process.env.API_DEV : process.env.API_PROD
  const httpLink = new HttpLink({ uri: uri + '/graphql' })

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    // This function is called before every request. Update ctx.req.session and window.__NUXT__.state.session
    // To point to wherever you store your token
    // const token = process.server ? ctx.req.session : window.__NUXT__.state.session

    operation.setContext({
      headers: {
        // authorization: `Bearer ${token}`
      }
    })
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache()
  }
}
