# Casdoor Svelte SDK

Official Svelte 5 client SDK for [Casdoor](https://casdoor.org/) - an open-source Identity and Access Management (IAM) solution.

## Installation

```bash
npm install casdoor-svelte-sdk
# or
yarn add casdoor-svelte-sdk
```

## Usage

### AuthCallback Component
```svelte
<script>
  import { AuthCallback } from 'casdoor-svelte-sdk';
</script>

<AuthCallback />
```

### SilentSignin Component
```svelte
<script>
  import { SilentSignin } from 'casdoor-svelte-sdk';
</script>

<SilentSignin />
```

## API

### AuthCallback
Handles OAuth callback from Casdoor after authentication.

### SilentSignin
Handles silent sign-in for single sign-on (SSO) scenarios.

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## License

Licensed under the [Apache License 2.0](LICENSE).
