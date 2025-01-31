# SD WEBUI API Client

API Client for [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui).

## Features

- Easy-to-use API client for Stable Diffusion WebUI
- Supports authentication
- Provides methods to interact with the API

## Prerequisites

You need to `set COMMANDLINE_ARGS=--api` on `webui-user.sh` to enable the API.

See [AUTOMATIC1111/stable-diffusion-webui/wiki/API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API) for more information.

## Installation

```bash
npm install @xct007/sdwebui-api-client
```

## Usage

```typescript
import { SDWebUIClient } from "@xct007/sdwebui-api-client"

const client = new SDWebUIClient({
   baseURL: "http://localhost:8080",

   // API authentication
   // Optional if --api-auth is set
   username: "admin",
   password: "admin"
})

client.api.memory()
  .then(console.log)
  .catch(console.error)
```

## Project structure

```bash
.
├── LICENSE
├── __tests__
│   ├── client.test.ts
│   └── index.test.ts
├── eslint.config.mjs
├── jest.config.ts
├── jest.setup.ts
├── package-lock.json
├── package.json
├── scripts
│   └── build.js
├── src
│   ├── client.ts
│   ├── error.ts
│   ├── index.ts
│   ├── sd
│   │   ├── index.ts
│   │   └── types.ts
│   └── shared.ts
├── tsc-multi.json
├── tsconfig.build.json
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [itsrose.dev@gmail.com](mailto:itsrose.dev@gmail.com).
