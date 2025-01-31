import * as https from "https";
import { Client } from "../src/client";

jest.mock("https");

describe("Client", () => {
	const baseUrl = "https://api.example.com";
	let client: Client;

	beforeEach(() => {
		client = new Client({ baseUrl });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("constructor", () => {
		it("should initialize with baseUrl and headers", () => {
			const headers = { Authorization: "Bearer token" };
			const client = new Client({ baseUrl, headers });
			expect(client).toHaveProperty("baseUrl", baseUrl);
			expect(client).toHaveProperty("headers", headers);
		});
	});

	describe("_makeRequest", () => {
		it("should make a successful request", async () => {
			const responseData = { success: true };
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
			};

			(https.request as jest.Mock).mockImplementation(
				(url, options, callback) => {
					callback(mockResponse);
					return mockRequest;
				}
			);

			const result = await client["_makeRequest"]("GET", "/test");
			expect(result).toEqual(responseData);
			expect(mockRequest.end).toHaveBeenCalled();
		});

		it("should handle request errors", async () => {
			const mockRequest = {
				on: jest.fn((event, callback) => {
					if (event === "error") callback(new Error("Request error"));
				}),
				write: jest.fn(),
				end: jest.fn(),
			};

			(https.request as jest.Mock).mockImplementation(() => mockRequest);

			await expect(
				client["_makeRequest"]("GET", "/test")
			).rejects.toThrow("Request error");
		});
	});

	describe("post", () => {
		it("should make a POST request", async () => {
			const mockMakeRequest = jest
				.spyOn(client as any, "_makeRequest")
				.mockResolvedValue({ success: true });
			const data = { key: "value" };

			const result = await client.post("/test", data);
			expect(mockMakeRequest).toHaveBeenCalledWith(
				"POST",
				"/test",
				data,
				undefined
			);
			expect(result).toEqual({ success: true });
		});
	});

	describe("get", () => {
		it("should make a GET request with query parameters", async () => {
			const mockMakeRequest = jest
				.spyOn(client as any, "_makeRequest")
				.mockResolvedValue({ success: true });
			const params = { key: "value" };

			const result = await client.get("/test", params);
			expect(mockMakeRequest).toHaveBeenCalledWith(
				"GET",
				"/test?key=value",
				undefined,
				undefined
			);
			expect(result).toEqual({ success: true });
		});

		it("should make a GET request without query parameters", async () => {
			const mockMakeRequest = jest
				.spyOn(client as any, "_makeRequest")
				.mockResolvedValue({ success: true });

			const result = await client.get("/test");
			expect(mockMakeRequest).toHaveBeenCalledWith(
				"GET",
				"/test",
				undefined,
				undefined
			);
			expect(result).toEqual({ success: true });
		});
	});
});
