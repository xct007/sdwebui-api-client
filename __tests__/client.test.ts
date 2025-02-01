import * as https from "https";
import { URL } from "url";
import { Client, ClientOptions } from "../src/client";
import { SDWebUIClientError } from "../src/error";

jest.mock("https");

describe("Client", () => {
	const baseUrl = "https://api.example.com";
	const headers = { Authorization: "Bearer token" };
	let client: Client;

	beforeEach(() => {
		client = new Client({ baseUrl, headers });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("constructor", () => {
		it("should initialize with baseUrl and headers", () => {
			expect(client).toHaveProperty("baseUrl", baseUrl);
			expect(client).toHaveProperty("headers", headers);
		});
	});

	describe("get", () => {
		it("should make a GET request and return response", async () => {
			const responseData = { data: "test" };
			const mockRequest = {
				on: jest.fn(),
				end: jest.fn(),
			};
			const mockResponse = {
				on: jest.fn((event, callback) => {
					if (event === "data")
						callback(JSON.stringify(responseData));
					if (event === "end") callback();
				}),
				statusCode: 200,
			};

			(https.request as jest.Mock).mockImplementation(
				(url, options, callback) => {
					callback(mockResponse);
					return mockRequest;
				}
			);

			const response = await client.get("/test");

			expect(response).toEqual(responseData);
			expect(https.request).toHaveBeenCalledWith(
				new URL("/test", baseUrl),
				expect.objectContaining({
					method: "GET",
					headers: expect.objectContaining(headers),
				}),
				expect.any(Function)
			);
		});

		it("should handle request errors", async () => {
			const mockRequest = {
				on: jest.fn((event, callback) => {
					if (event === "error") callback(new Error("Request error"));
				}),
				end: jest.fn(),
			};

			(https.request as jest.Mock).mockReturnValue(mockRequest);

			await expect(client.get("/test")).rejects.toThrow(
				SDWebUIClientError
			);
		});
	});

	describe("post", () => {
		it("should make a POST request with data and return response", async () => {
			const requestData = { key: "value" };
			const responseData = { data: "test" };
			const mockRequest = {
				on: jest.fn(),
				write: jest.fn(),
				end: jest.fn(),
			};
			const mockResponse = {
				on: jest.fn((event, callback) => {
					if (event === "data")
						callback(JSON.stringify(responseData));
					if (event === "end") callback();
				}),
				statusCode: 200,
			};

			(https.request as jest.Mock).mockImplementation(
				(url, options, callback) => {
					callback(mockResponse);
					return mockRequest;
				}
			);

			const response = await client.post("/test", requestData);

			expect(response).toEqual(responseData);
			expect(mockRequest.write).toHaveBeenCalledWith(
				JSON.stringify(requestData)
			);
			expect(https.request).toHaveBeenCalledWith(
				new URL("/test", baseUrl),
				expect.objectContaining({
					method: "POST",
					headers: expect.objectContaining(headers),
				}),
				expect.any(Function)
			);
		});

		it("should handle request errors", async () => {
			const mockRequest = {
				on: jest.fn((event, callback) => {
					if (event === "error") callback(new Error("Request error"));
				}),
				write: jest.fn(),
				end: jest.fn(),
			};

			(https.request as jest.Mock).mockReturnValue(mockRequest);

			await expect(
				client.post("/test", { key: "value" })
			).rejects.toThrow(SDWebUIClientError);
		});
	});
});
