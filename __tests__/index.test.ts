import * as Https from "../src/client";
import * as Errors from "../src/error";
import { SDWebUIClient, SDWebUIClientOptions } from "../src/index";
import * as SD from "../src/sd";

jest.mock("../src/client");
jest.mock("../src/error");
jest.mock("../src/sd");

describe("SDClient", () => {
	const originalEnv = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...originalEnv };
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	it("should initialize with default environment variables", () => {
		process.env.SD_API_URL = "http://api.example.com";
		process.env.SD_API_USERNAME = "user";
		process.env.SD_API_PASSWORD = "pass";

		const client = new SDWebUIClient({});

		expect(client).toBeInstanceOf(SDWebUIClient);
		expect(Https.Client).toHaveBeenCalledWith({
			baseUrl: "http://api.example.com",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${Buffer.from("user:pass").toString("base64")}`,
			},
		});
	});

	it("should initialize with provided options", () => {
		const options: SDWebUIClientOptions = {
			baseUrl: "http://custom-api.com",
			username: "customUser",
			password: "customPass",
		};

		const client = new SDWebUIClient(options);

		expect(client).toBeInstanceOf(SDWebUIClient);
		expect(Https.Client).toHaveBeenCalledWith({
			baseUrl: "http://custom-api.com",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${Buffer.from("customUser:customPass").toString("base64")}`,
			},
		});
	});

	it("should throw an error if required environment variable is missing", () => {
		delete process.env.SD_API_URL;

		expect(() => new SDWebUIClient({})).toThrow(Errors.SDWebUIClientError);
		expect(Errors.SDWebUIClientError).toHaveBeenCalledWith(
			"Missing environment variable: SD_API_URL"
		);
	});

	it("should not set Authorization header if username or password is missing", () => {
		process.env.SD_API_URL = "http://api.example.com";
		process.env.SD_API_USERNAME = "user";

		const client = new SDWebUIClient({});

		expect(client).toBeInstanceOf(SDWebUIClient);
		expect(Https.Client).toHaveBeenCalledWith({
			baseUrl: "http://api.example.com",
			headers: {
				"Content-Type": "application/json",
			},
		});
	});

	it("should initialize the API property", () => {
		process.env.SD_API_URL = "http://api.example.com";

		const client = new SDWebUIClient({});

		expect(client.api).toBeInstanceOf(SD.SDWebUIApi);
	});
});
