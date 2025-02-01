/**
 * Represents an error specific to the SD Web UI Client.
 * This class extends the built-in `Error` class to provide additional context for errors
 * that occur within the SD Web UI Client.
 *
 * @extends {Error}
 */
export class SDWebUIClientError extends Error {
	/**
	 * Additional data associated with the error.
	 */
	public data?: unknown;
	constructor(message: string, data?: unknown) {
		super(message);
		this.name = "SDWebUIClientError";
		this.data = data;
	}
}
