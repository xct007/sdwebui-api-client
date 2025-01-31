import { Shared } from "../shared";
import {
	CmdFlags,
	Embedding,
	Extension,
	ExtraImage,
	FaceRestorer,
	HyperNetwork,
	Img2ImgOptions,
	InterrogateOptions,
	LatentUpscaleMode,
	Memory,
	PromptStyle,
	RealEsrganModel,
	SDOptions,
	Sampler,
	Scheduler,
	ScriptInfo,
	Scripts,
	SdModel,
	SdVae,
	Txt2ImgOptions,
	UpScaler,
} from "./types";

/**
 * Make all properties in T optional except for the provided ones.
 * @example
 * type Example = { a: string; b: number; c: boolean };
 * type Result = PartialExcept<Example, "a">;
 */
export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> &
	Required<Pick<T, K>>;

/**
 * The `SDWebUIApi` class provides methods to interact with the AUTOMATIC1111 Stable Diffusion Web UI API.
 * It extends the `Shared` class and includes various methods to generate images, retrieve information,
 * and manage options and configurations.
 *
 * Each method corresponds to a specific API endpoint and provides a convenient way to interact with
 * the AUTOMATIC1111 Stable Diffusion Web UI functionalities.
 */
export class SDWebUIApi extends Shared {
	/**
	 * Generate images from text.
	 *
	 * Reference: [text2imgapi](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L432)
	 * @param options - Options for generating images from text
	 * @returns Generated images as base64 strings
	 */
	txt2img<T extends Partial<Txt2ImgOptions>>(
		options: T
	): Promise<Txt2ImgResponse<T>> {
		return this._client.post("/sdapi/v1/txt2img", options);
	}
	/**
	 * Generate images from images.
	 *
	 * Reference: [img2imgapi](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L492)
	 * @param options - Options for generating images from images
	 * @returns Generated images as base64 strings
	 */
	img2img<T extends Partial<Img2ImgOptions>>(
		options: T & {
			/**
			 * List of base64 encoded images
			 */
			init_images: string[];
		}
	): Promise<Img2ImgResponse<T>> {
		return this._client.post("/sdapi/v1/img2img", options);
	}
	/**
	 * Generate extra images from a single image.
	 *
	 * Reference: [extras_single_image_api](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L567)
	 * @param options - Options for generating extra images from a single image
	 * @returns Generated images as base64 strings
	 */
	extraSingleImage<T extends Omit<ExtraImage, "imageList">>(
		options: PartialExcept<T, "image">
	): Promise<Omit<ExtraImageResponse, "images">> {
		return this._client.post("/sdapi/v1/extra-single-image", options);
	}
	/**
	 * Generate extra images from multiple images.
	 *
	 * Reference: [extras_batch_images_api](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L577)
	 * @param options - Options for generating extra images from multiple images
	 * @returns Generated images as base64 strings
	 */
	extraBatchImage<T extends Omit<ExtraImage, "image">>(
		options: PartialExcept<T, "imageList">
	): Promise<Omit<ExtraImageResponse, "image">> {
		return this._client.post("/sdapi/v1/extra-batch-image", options);
	}
	/**
	 * Get information about a PNG image.
	 *
	 * Reference: [pnginfoapi](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L588)
	 * @param image - Base64 encoded PNG image
	 * @returns Information about the PNG image
	 */
	pngInfo<T extends string | undefined>(
		image?: T
	): Promise<PngInfoResponse<T>> {
		return this._client.post("/sdapi/v1/png-info", { image });
	}
	/**
	 * Get the progress of the current task.
	 *
	 * Reference: [progressapi](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L602)
	 * @returns Progress of the current task
	 */
	progress(): Promise<ProgressResponse> {
		return this._client.get("/sdapi/v1/progress");
	}
	/**
	 * Interrogating an image.
	 *
	 * Reference: [interrogateapi](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L630)
	 * @param options - Options for interrogating the current task
	 */
	interrogate(options: InterrogateOptions): Promise<InterrogateResponse> {
		return this._client.post("/sdapi/v1/interrogate", options);
	}
	/**
	 * Interrupt the current task.
	 *
	 * Reference: [interruptapi](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L649)
	 * @returns Information about the interruption
	 */
	interrupt(): Promise<InterruptResponse> {
		return this._client.post("/sdapi/v1/interrupt");
	}
	/**
	 * Skip the current task.
	 *
	 * Reference: [skipapi](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L664)
	 * @returns Information about the skipped task
	 */
	skip(): Promise<SkipResponse> {
		return this._client.post("/sdapi/v1/skip");
	}
	/**
	 * **Get** the current options or **set** the options.
	 *
	 * Reference:
	 * [get_config](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L667),
	 * [set_config](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L678)
	 *
	 * @param options - Options to set
	 * @returns Current options
	 *
	 * @example
	 * ```ts
	 * const options = await client.api.options();
	 * console.log(options);
	 *
	 * const options = await client.api.options({
	 * 	"sd_model_checkpoint": "some_checkpoint"
	 * });
	 * console.log(options);
	 */
	options<T extends Partial<SDOptions> & Record<string, any>>(
		options?: T
	): Promise<OptionsResponse<T>> {
		// idk bruh. this is a mess
		return this._client[options !== undefined ? "post" : "get"](
			"/sdapi/v1/options",
			options ?? {}
		);
	}
	/**
	 * Alias for `options`.
	 *
	 * Get the current options.
	 *
	 * Reference: [get_config](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L678)
	 * @returns Current options
	 */
	getOptions(): Promise<SDOptions> {
		return this._client.get("/sdapi/v1/options");
	}
	/**
	 * Alias for `options`.
	 *
	 * Set the current options.
	 *
	 * Reference: [set_config](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L667)
	 * @param options - Options to set
	 * @returns Current options
	 */
	setOptions<T extends Partial<SDOptions> & Record<string, any>>(
		options: T
	): Promise<OptionsResponse<T>> {
		return this._client.post("/sdapi/v1/options", options);
	}
	/**
	 * Get the current command flags.
	 *
	 * Reference: [get_cmd_flags](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L689)
	 * @returns Current command flags
	 */
	cmdFlags(): Promise<CmdFlags> {
		return this._client.get("/sdapi/v1/cmd-flags");
	}
	/**
	 * Get all available samplers.
	 *
	 * Reference: [get_samplers](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L692)
	 * @returns All available samplers
	 */
	samplers(): Promise<Sampler[]> {
		return this._client.get("/sdapi/v1/samplers");
	}
	/**
	 * Get all available schedulers.
	 *
	 * Reference: [get_schedulers](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L695)
	 * @returns All available schedulers
	 */
	schedulers(): Promise<Scheduler[]> {
		return this._client.get("/sdapi/v1/schedulers");
	}
	/**
	 * Get all available upscalers.
	 *
	 * Reference: [get_upscalers](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L706)
	 * @returns All available upscalers
	 */
	upscalers(): Promise<UpScaler[]> {
		return this._client.get("/sdapi/v1/upscalers");
	}
	/**
	 * Get all available latent upscale modes.
	 *
	 * Reference: [get_latent_upscale_modes](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L718)
	 * @returns All available latent upscale modes
	 */
	latentUpscaleModes(): Promise<LatentUpscaleMode[]> {
		return this._client.get("/sdapi/v1/latent-upscale-modes");
	}
	/**
	 * Get all available SD models.
	 *
	 * Reference: [get_sd_models](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L726)
	 * @returns All available SD models
	 */
	sdModels(): Promise<SdModel[]> {
		return this._client.get("/sdapi/v1/sd-models");
	}
	/**
	 * Get all available SD VAEs.
	 *
	 * Reference: [get_sd_vaes](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L730)
	 * @returns All available SD VAEs
	 */
	sdVae(): Promise<SdVae[]> {
		return this._client.get("/sdapi/v1/sd-vae");
	}
	/**
	 * Get all available hyper networks.
	 *
	 * Reference: [get_hypernetworks](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L734)
	 * @returns All available hyper networks
	 */
	hyperNetwork(): Promise<HyperNetwork[]> {
		return this._client.get("/sdapi/v1/hypernetwork");
	}
	/**
	 * Get all available face restorers.
	 *
	 * Reference: [get_face_restorers](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L737)
	 * @returns All available face restorers
	 */
	faceRestorers(): Promise<FaceRestorer[]> {
		return this._client.get("/sdapi/v1/face-restorers");
	}
	/**
	 * Get all available RealESRGAN models.
	 *
	 * Reference: [get_realesrgan_models](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L740)
	 * @returns All available RealESRGAN models
	 */
	realEsrganModels(): Promise<RealEsrganModel[]> {
		return this._client.get("/sdapi/v1/realesrgan-models");
	}
	/**
	 * Get all available prompt styles.
	 *
	 * Reference: [get_prompt_styles](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L743)
	 * @returns All available prompt styles
	 */
	promptStyles(): Promise<PromptStyle[]> {
		return this._client.get("/sdapi/v1/prompt-styles");
	}
	/**
	 * Get all available embeddings.
	 *
	 * Reference: [get_embeddings](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L751)
	 * @returns All available embeddings
	 */
	embeddings<T extends string>(): Promise<Embedding<T>[]> {
		return this._client.get("/sdapi/v1/hypernetwork");
	}
	/**
	 * Refresh embeddings.
	 *
	 * Reference: [refresh_embeddings](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L771)
	 * @returns Information about the refresh
	 */
	refreshEmbeddings(): Promise<string> {
		return this._client.post("/sdapi/v1/refresh-embeddings");
	}
	/**
	 * Refresh checkpoints.
	 *
	 * Reference: [refresh_checkpoints](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L775)
	 * @returns Information about the refresh
	 */
	refreshCheckpoints(): Promise<string> {
		return this._client.post("/sdapi/v1/refresh-checkpoints");
	}
	/**
	 * Refresh VAE.
	 *
	 * Reference: [refresh_vae](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L779)
	 * @returns Information about the refresh
	 */
	refreshVae(): Promise<string> {
		return this._client.post("/sdapi/v1/refresh-vae");
	}
	/**
	 * Create embedding from options.
	 *
	 * Reference: [create_embedding](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L783)
	 * @param options - Options for creating an embedding
	 */
	createEmbedding(options: Record<string, any>): Promise<{ info: string }> {
		return this._client.post("/sdapi/v1/create/embedding", options);
	}
	/**
	 * Create HyperNetwork from options.
	 *
	 * Reference: [create_hypernetwork](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L795)
	 * @param options - Options for creating a HyperNetwork
	 * @returns Information about the HyperNetwork
	 */
	createHyperNetwork(
		options: Record<string, any>
	): Promise<{ info: string }> {
		return this._client.post("/sdapi/v1/create/hypernetwork", options);
	}
	/**
	 * Train embedding from options.
	 *
	 * Reference: [train_embedding](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L805)
	 * @param options - Options for training an embedding
	 * @returns Information about the training
	 */
	trainEmbedding(options: Record<string, any>): Promise<{ info: string }> {
		return this._client.post("/sdapi/v1/train/embedding", options);
	}
	/**
	 * Train HyperNetwork from options.
	 *
	 * Reference: [train_hypernetwork](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L826)
	 * @param options - Options for training a HyperNetwork
	 * @returns Information about the training
	 */
	trainHyperNetwork(options: Record<string, any>): Promise<{ info: string }> {
		return this._client.post("/sdapi/v1/train/hypernetwork", options);
	}
	/**
	 * Get the current memory usage.
	 *
	 * Reference: [get_memory](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L851)
	 * @returns Current memory usage
	 */
	memory(): Promise<Memory> {
		return this._client.get("/sdapi/v1/memory");
	}
	/**
	 * Unload the current checkpoint.
	 *
	 * Reference: [unloadapi](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L654)
	 * @returns Information about the unloading
	 */
	unloadCheckPoint(): Promise<string> {
		return this._client.post("/sdapi/v1/unload-checkpoint");
	}
	/**
	 * Reload the current checkpoint.
	 *
	 * Reference: [reloadapi](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L659)
	 * @returns Information about the reloading
	 */
	reloadCheckPoint(): Promise<string> {
		return this._client.post("/sdapi/v1/unload-checkpoint");
	}
	/**
	 * Get all available scripts.
	 *
	 * Reference: [get_scripts_list](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L294)
	 * @returns All available scripts
	 */
	scripts(): Promise<Scripts> {
		return this._client.get("/sdapi/v1/scripts");
	}
	/**
	 * Get all available script info.
	 *
	 * Reference: [get_script_info](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L300)
	 * @returns All available script info
	 */
	scriptInfo(): Promise<ScriptInfo[]> {
		return this._client.get("/sdapi/v1/script-info");
	}
	/**
	 * Get all installed extensions.
	 *
	 * Reference: [get_extensions_list](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/api/api.py#L886)
	 * @returns All installed extensions
	 */
	extensions(): Promise<Extension[]> {
		return this._client.get("/sdapi/v1/extensions");
	}
}

type Txt2ImgResponse<T extends Partial<Txt2ImgOptions>> = {
	/**
	 * The generated images as base64 strings
	 */
	images: string[];
	/**
	 * Used parameters for generating the images
	 */
	parameters: Txt2ImgOptions & Pick<T, keyof Txt2ImgOptions>;
	/**
	 * JSON String representation of the parameters
	 */
	info: string;
};

type Img2ImgResponse<T extends Partial<Img2ImgOptions>> = Txt2ImgResponse<T> & {
	/**
	 * Used parameters for generating the images
	 */
	parameters: Img2ImgOptions & Pick<T, keyof Img2ImgOptions>;
};

type ExtraImageResponse = {
	image: string;
	images: string[];
	info: string;
};

type PngInfoResponse<T> = {
	info: string;
} & T extends string
	? {
			items: Record<string, unknown>;
			parameters: Record<string, unknown>;
		}
	: never;

type ProgressResponse = {
	progress: number;
	eta_relative: number;
	state: Record<string, unknown>;
	current_image: string;
	textinfo: string;
};

type InterrogateResponse = string;
type InterruptResponse = string;
type SkipResponse = string;

type OptionsResponse<
	T extends (Partial<SDOptions> & Record<string, any>) | undefined,
> = T extends undefined ? SDOptions : T;

export {
	Txt2ImgResponse,
	Img2ImgResponse,
	ExtraImageResponse,
	PngInfoResponse,
	ProgressResponse,
	InterrogateResponse,
	InterruptResponse,
	SkipResponse,
	OptionsResponse,
};
