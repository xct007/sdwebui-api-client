import * as Https from "./client";
import * as Errors from "./error";
import * as API from "./sd";

interface SDWebUIClientOptions {
	/**
	 * The base URL for the API
	 *
	 * Default: `ENV["SD_API_URL"]`
	 */
	baseUrl?: string;
	/**
	 * username for the API if required
	 *
	 * Default: `ENV["SD_API_USERNAME"]`
	 */
	username?: string;
	/**
	 * password for the API if required
	 *
	 * Default: `ENV["SD_API_PASSWORD"]`
	 */
	password?: string;
}

/**
 * Represents a client for interacting with the AUTOMATIC1111 Stable Diffusion Web UI API.
 * Extends the `Https.Client` class to provide methods for making HTTP requests.
 *
 * @remarks
 * This client automatically sets the base URL and headers for the API requests.
 * It also supports basic authentication using a username and password.
 *
 * @example
 * ```typescript
 * const client = new SDWebUIClient({
 *   baseUrl: "https://api.example.com",
 *   username: "user",
 *   password: "pass"
 * });
 * ```
 *
 * @param options - Configuration options for the client.
 * @param options.baseUrl - The base URL for the API. If not provided, it will be read from the environment variable `SD_API_URL`.
 * @param options.username - The username for basic authentication. If not provided, it will be read from the environment variable `SD_API_USERNAME`.
 * @param options.password - The password for basic authentication. If not provided, it will be read from the environment variable `SD_API_PASSWORD`.
 *
 * @extends Https.Client
 */
class SDWebUIClient extends Https.Client {
	constructor(options: SDWebUIClientOptions) {
		const baseUrl =
			options.baseUrl !== undefined
				? options.baseUrl
				: readEnv("SD_API_URL", true);

		const headers = {
			"Content-Type": "application/json",
		} as Record<string, string>;

		const auth =
			(options.username =
				options.username || readEnv("SD_API_USERNAME")) &&
			(options.password =
				options.password || readEnv("SD_API_PASSWORD")) &&
			Buffer.from(`${options.username}:${options.password}`).toString(
				"base64"
			);

		if (auth) {
			headers.Authorization = `Basic ${auth}`;
		}

		super({ baseUrl, headers });
	}

	/**
	 * Represents the API for interacting with the AUTOMATIC1111 Stable Diffusion Web UI API.
	 */
	api: API.SDWebUIApi = new API.SDWebUIApi(this);
}

const readEnv = (key: string, isRequired?: boolean): string => {
	const value = process.env[key];
	if ((!value || value === "") && isRequired) {
		throw new Errors.SDWebUIClientError(
			`Missing environment variable: ${key}`
		);
	}
	return value || "";
};

export { SDWebUIClient, SDWebUIClientOptions, Errors, Https };

export * from "./sd/types";
export {
	SDWebUIApi,
	Txt2ImgResponse,
	Img2ImgResponse,
	ExtraImageResponse,
	PngInfoResponse,
	ProgressResponse,
	InterrogateResponse,
	InterruptResponse,
	SkipResponse,
	OptionsResponse,
	PartialExcept,
} from "./sd";
