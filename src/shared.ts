import { SDWebUIClient } from "./index";

/**
 * Represents a shared resource or functionality that can be used across different parts of the application.
 */
export class Shared {
	protected _client: SDWebUIClient;

	constructor(client: SDWebUIClient) {
		this._client = client;
	}
}
