const http = require('http');
const PORT = 3000;
const DEFAULT_HEADER = { 'Content-Type': 'application/json' };
const HeroFactory = require('./factories/heroFactory');
const Hero = require('./entities/hero');
const heroService = HeroFactory.generateInstance();

const routes = {
    '/heroes:GET': async (request, response) => {
        const { id } = request.queryString;
        const heroes = await heroService.find(id);

        response.write(JSON.stringify({ results: heroes}));

        return response.end();
    },

    '/heroes:POST': async (request, response) => {
        try {
            // await Promise.reject('heroes:get'); --> Para forçar excessões

            // Async Iterator
            for await (const data of request) {
                const item = JSON.parse(data);
                const hero = new Hero(item);

                const { error, valid } = hero.isValid();

                if(!valid) {
                    response.writeHead(400, DEFAULT_HEADER);
                    response.write(JSON.stringify({ error: error.join(',') }));

                    return response.end(); 
                }

                const id = await heroService.create(hero);
                response.writeHead(201, DEFAULT_HEADER);
                response.write(JSON.stringify({ sucess: 'User created with sucess!', id}));

                return response.end();
            }
        } catch (error) {
            handleError(response)(error);
        }
    },

    default: (request, response) => {
        response.end();
    }
};

const handleError = response => {
    return error => {
        console.error('Houve um erro durante a execução da API', error);
        response.writeHead(500, DEFAULT_HEADER);
        response.write(JSON.stringify({ error: 'Internal Server Error.' }));

        return response.end();
    }
}

const handler = (request, response) => {
    const { url, method } = request;
    const [first, route, id] = url.split('/');

    request.queryString = { id: isNaN(id) ? id : Number(id)};

    const key = `/${route}:${method}`;

    const chosen = routes[key] || routes.default;
    return chosen(request, response).catch(handleError(response));
};

http.createServer(handler)
    .listen(PORT, () => console.log("Server running at", PORT));

// 26:11