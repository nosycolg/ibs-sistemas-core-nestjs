# IBS-SISTEMAS-CORE-NESTJS

### Make sure you have the following dependencies installed before proceeding:

- Node Version Manager (NVM)
- Node.js (Version specified in the .nvmrc file)
- npm (Node Package Manager)
- Docker

### Setting up the environment:

Configure the `.env` file with the required environment variables.

### How to Install?

```bash
nvm use
npm install
```

### How to start the Docker container for MySQL, run the following command:

```bash
make up
```

### How to apply database migrations?

```bash
npx prisma db push
```

### How to run?

```bash
nvm use
npm run start:dev
```

### How to run tests?

```bash
nvm use
npm run test
```

### How to build it?

```bash
nvm use
npm run build
```
