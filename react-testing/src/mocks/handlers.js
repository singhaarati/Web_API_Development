import { rest } from 'msw'

export const handlers = [
    rest.get('http://jsonplaceholder.typicode.com/users',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    { id: 1, name: 'Ram Kumar' },
                    { id: 2, name: 'Hari Saran' },
                    { id: 3, name: "Sita Kumari" }
                ])
            )
        }),
    rest.get('https://jsonplaceholder.typicode.com/todos',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    { id: 1, title: 'buy apples' },
                    { id: 2, title: 'buy oranges' }
                ])
            )
        })

]