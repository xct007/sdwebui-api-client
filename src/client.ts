import { IncomingMessage } from "http";
import * as https from "https";
import { URL } from "url";
import { SDWebUIClientError } from "./error";

interface ClientOptions {
	/**
	 * The base URL for all API requests.
	 */
	baseUrl: string;
	/**
	 * Optional default headers to include in every request.
	 */
	headers?: Record<string, string>;
}

/**
 * Client is responsible for making HTTP requests to a specified base URL.
 *
 * @remarks
 * This class provides methods for performing GET and POST requests, handling request options, headers, and responses.
 * It abstracts the underlying HTTPS request handling and provides a simple interface for interacting with APIs.
 *
 * @param baseUrl - The base URL for all API requests.
 * @param headers - Optional default headers to include in every request.
 */
class Client {
	private readonly baseUrl: string;
	private readonly headers: Record<string, string>;

	constructor({ baseUrl, headers = {} }: ClientOptions) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}

	private _makeRequest<T>(
		method: string,
		path: string,
		data?: unknown,
		opts?: https.RequestOptions
	): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const url = this._buildUrl(path);
			const options = this._buildOptions(method, opts);

			const req = https.request(url, options, (res) => {
				let response = "";
				res.on("data", (chunk) => (response += chunk));
				res.on("end", () =>
					this._handleResponse(res, response, resolve, reject)
				);
			});

			req.on("error", (err) => {
				reject(new SDWebUIClientError(err.message));
			});

			if (data) {
				req.write(JSON.stringify(data));
			}

			req.end();
		});
	}

	private _buildUrl(path: string): URL {
		return new URL(path, this.baseUrl);
	}

	private _buildOptions(
		method: string,
		opts?: https.RequestOptions
	): https.RequestOptions {
		return {
			method,
			headers: {
				"Content-Type": "application/json",
				...this.headers,
				...opts?.headers,
			},
			...opts,
		};
	}

	private _handleResponse<T>(
		res: IncomingMessage,
		response: string,
		onfulfill: (value: T) => void,
		onreject: (reason: Error) => void
	): void {
		if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
			return onreject(
				new SDWebUIClientError(
					`Request failed with status code ${res.statusCode}`,
					this._parseResponse(response)
				)
			);
		}
		onfulfill(this._parseResponse(response));
	}

	private _parseResponse<T>(response: string): T {
		try {
			return JSON.parse(response);
		} catch (err) {
			return response as unknown as T;
		}
	}

	public post<T>(
		path: string,
		data?: unknown,
		opts?: https.RequestOptions
	): Promise<T> {
		return this._makeRequest<T>("POST", path, data, opts);
	}

	public get<T>(
		path: string,
		params?: URLSearchParams | string | Record<string, string>,
		opts?: https.RequestOptions
	): Promise<T> {
		const query =
			params instanceof URLSearchParams
				? params.toString()
				: params
					? new URLSearchParams(params).toString()
					: undefined;
		const fullPath = query ? `${path}?${query}` : path;
		return this._makeRequest<T>("GET", fullPath, undefined, opts);
	}
}

export { Client, ClientOptions };
