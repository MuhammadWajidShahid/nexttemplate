import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith", value: "bruno@email.com" },
                password: { label: "Password", type: "password", value: "bruno" }
            },
            authorize: async (credentials) => {
                // Add logic here to look up the user from the credentials supplied
                // const user = { id: 1, name: 'J Smith', email: 'bruno@email.com', password: "bruno" }
                const res = await fetch(process.env.API_ADDRESS + "/auth/login", {
                    method: "POST", body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log("called",res.status)
                if (res.ok) {
                    // Any object returned will be saved in `user` property of the JWT
                    const api_key = await res.json();
                    return { api_key: api_key.access_token, email: credentials.email }
                    //   return Promise.resolve(user)
                } else {
                    // If you return null or false then the credentials will be rejected
                    return Promise.resolve(null)
                    //   return Promise.resolve(null)
                    // You can also Reject this callback with an Error or with a URL:
                    // return Promise.reject(new Error('error message')) // Redirect to error page
                    // return Promise.reject('/path/to/redirect')        // Redirect to a URL
                }
            }
        })
    ],
    session: {
        jwt: true
    },
    callbacks: {
        /**
         * @param  {object} session      Session object
         * @param  {object} user         User object    (if using database sessions)
         *                               JSON Web Token (if not using database sessions)
         * @return {object}              Session that will be returned to the client 
         */
        session: async (session, user, sessionToken) => {
            session.api_key = user.api_key // Add property to session
            const res = await fetch(process.env.API_ADDRESS + "/check", {
                headers: {
                    'Authorization': `Bearer ${session.api_key}`
                }
            })
            if (res.status === 401) {
                session.user = null;
                session.api_key = null;
                return Promise.reject()
            }
            return Promise.resolve(session);
        },
        jwt: async (token, user, account, profile, isNewUser) => {
            const isSignIn = (user) ? true : false
            // Add auth_time to token on signin in
            if (isSignIn) { token.api_key = user.api_key }
            return Promise.resolve(token)
        }
    }
}

export default (req, res) => NextAuth(req, res, options)