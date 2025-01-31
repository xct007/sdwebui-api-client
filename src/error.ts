/**
 * Represents an error specific to the SD Web UI Client.
 * This class extends the built-in `Error` class to provide additional context for errors
 * that occur within the SD Web UI Client.
 *
 * @extends {Error}
 */
export class SDWebUIClientError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "SDClientError";
	}
}
