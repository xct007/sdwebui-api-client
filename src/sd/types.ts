/**
 * Represents the options that can be passed to the `txt2img` endpoint
 */
export type Txt2ImgOptions = {
	/**
	 * The positive prompt to use for the generation
	 */
	prompt: string;
	/**
	 * The negative prompt to use for the generation
	 */
	negative_prompt: string;
	/**
	 * Styles that should be applied to the generation
	 */
	styles: string[] | null;
	/**
	 * The seed to use for the generation
	 */
	seed: number;
	/**
	 * Subseed to use for the generation
	 */
	subseed: number;
	/**
	 * Strength of the subseed
	 */
	subseed_strength: number;
	/**
	 * resize seed from height
	 */
	seed_resize_from_h: number;
	/**
	 * resize seed from width
	 */
	seed_resize_from_w: number;
	/**
	 * Sampler name to use for the generation
	 */
	sampler_name: string;
	/**
	 * Scheduler to use for the generation
	 */
	scheduler: string | null;
	/**
	 * Batch number generation
	 */
	batch_size: number;
	/**
	 * The number of iterations to run
	 */
	n_iter: number;
	/**
	 * The number of steps to run
	 */
	steps: number;
	/**
	 * Classifier Free Guidance (cfg) scale
	 *
	 * how closely you'd like your artwork generator to
	 * follow the input prompt
	 */
	cfg_scale: number;
	/**
	 * image width
	 */
	width: number;
	/**
	 * image height
	 */
	height: number;
	/**
	 * Should restore faces
	 */
	restore_faces: boolean | null;
	/**
	 * Should tile the image
	 */
	tiling: boolean | null;
	/**
	 * Don't save samples
	 */
	do_not_save_samples: boolean;
	/**
	 * Don't save grid
	 */
	do_not_save_grid: boolean;
	/**
	 * Estimated Time of Arrival
	 */
	eta: number | null;
	/**
	 * Denoising strength
	 *
	 * Determines the extent to which noise is removed or reduced in the generated images.
	 */
	denoising_strength: number | null;
	/**
	 * `s_min_uncond`
	 */
	s_min_uncond: number | null;
	/**
	 * `s_churn`
	 */
	s_churn: number | null;
	/**
	 * `s_tmax`
	 */
	s_tmax: number | null;
	/**
	 * `s_tmin`
	 */
	s_tmin: number | null;
	/**
	 * `s_noise`
	 */
	s_noise: number | null;
	/**
	 * Override current settings
	 *
	 * See [example](https://gist.github.com/w-e-w/0f37c04c18e14e4ee1482df5c4eb9f53#file-sd-webui-txt2img-img2img-api-example-py-L132)
	 */
	override_settings: OverrideSettings | null;
	/**
	 * Restore settings after override
	 */
	override_settings_restore_afterwards: boolean;
	/**
	 * Refiner checkpoint
	 */
	refiner_checkpoint: string | null;
	/**
	 * Refiner switch at what point
	 */
	refiner_switch_at: number | null;
	/**
	 * Should disable extra networks
	 */
	disable_extra_networks: boolean;
	/**
	 * First pass image
	 */
	firstpass_image: string | null;
	/**
	 * Comments
	 */
	comments: Record<string, any> | null;
	/**
	 * Enable High Resolution
	 */
	enable_hr: boolean;
	/**
	 * First phase width
	 */
	firstphase_width: number;
	/**
	 * First phase height
	 */
	firstphase_height: number;
	/**
	 * High Resolution scale
	 */
	hr_scale: number;
	/**
	 * High Resolution upscaler to use
	 */
	hr_upscaler: string | null;
	/**
	 * High Resolution second pass steps
	 */
	hr_second_pass_steps: number;
	/**
	 * Resize High Resolution X
	 */
	hr_resize_x: number;
	/**
	 * Resize High Resolution Y
	 */
	hr_resize_y: number;
	/**
	 * High Resolution checkpoint name
	 */
	hr_checkpoint_name: string | null;
	/**
	 * High Resolution Sampler name
	 */
	hr_sampler_name: string | null;
	/**
	 * High Resolution Scheduler
	 */
	hr_scheduler: string | null;
	/**
	 * High Resolution positive prompt
	 */
	hr_prompt: string;
	/**
	 * High Resolution negative prompt
	 */
	hr_negative_prompt: string;
	/**
	 * Force Task ID
	 */
	force_task_id: string | null;
	/**
	 * Sampler index
	 */
	sampler_index: string;
	/**
	 * Script name to use
	 */
	script_name: string | null;
	/**
	 * Script arguments
	 */
	script_args: (string | number | null)[] | never[];
	/**
	 * Send the generated images
	 * meaning the images will be sent to the client
	 * and
	 * we are the client
	 *
	 * `{"images": [...]}`
	 */
	send_images: boolean;
	/**
	 * Save the generated images
	 */
	save_images: boolean;
	/**
	 * Always on scripts
	 */
	alwayson_scripts: Record<string, any> | null;
	/**
	 * Infotext
	 */
	infotext: string | null;
};

/**
 * Represents the options that can be passed to the `img2img` endpoint
 */
export type Img2ImgOptions = {
	/**
	 * Initial image to process
	 */
	init_images: string[];
} & Txt2ImgOptions;

/**
 * Represents the options that can be passed to the `override_settings` field
 */
export type OverrideSettings = {
	/**
	 * Override current model
	 */
	sd_model_checkpoint: string;
	/**
	 * CLIP SKIP
	 */
	CLIP_stop_at_last_layers: number;
	/**
	 * Enable add metadata to the image
	 */
	enable_pnginfo: boolean;
	/**
	 * Add model hash to the info
	 */
	add_model_hash_to_info: boolean;
	/**
	 * Add Model name to the info
	 */
	add_model_name_to_info: boolean;
} & Record<string, any>;

/**
 * Represents the options that can be passed to the `extra-single-image`
 * and `extra-batch-images` endpoints
 */
export type ExtraImage = {
	resize_mode: number;
	show_extras_results: boolean;
	gfpgan_visibility: number;
	codeformer_visibility: number;
	codeformer_weight: number;
	upscaling_resize: number;
	upscaling_resize_w: number;
	upscaling_resize_h: number;
	upscaling_crop: boolean;
	upscaler_1: string;
	upscaler_2: string;
	extras_upscaler_2_visibility: number;
	upscale_first: boolean;
	image: string;
	imageList: ExtraImageList[];
};
/**
 * List of extra images
 */
export type ExtraImageList = {
	/**
	 * Image data
	 */
	data: string;
	/**
	 * Image name
	 */
	name: string;
};

/**
 * Represents the options that can be passed to the `interrogate` endpoint
 */
export type InterrogateOptions = {
	/**
	 * The input image in base64.
	 */
	image: string;
	/**
	 * The model to use.
	 */
	model: string;
};

/**
 * Represents the Stable Diffusion options
 */
export type SDOptions = {
	samples_save: boolean;
	samples_format: string;
	samples_filename_pattern: string;
	save_images_add_number: boolean;
	save_images_replace_action: string;
	grid_save: boolean;
	grid_format: string;
	grid_extended_filename: boolean;
	grid_only_if_multiple: boolean;
	grid_prevent_empty_spots: boolean;
	grid_zip_filename_pattern: string;
	n_rows: number;
	font: string;
	grid_text_active_color: string;
	grid_text_inactive_color: string;
	grid_background_color: string;
	save_images_before_face_restoration: boolean;
	save_images_before_highres_fix: boolean;
	save_images_before_color_correction: boolean;
	save_mask: boolean;
	save_mask_composite: boolean;
	jpeg_quality: number;
	webp_lossless: boolean;
	export_for_4chan: boolean;
	img_downscale_threshold: number;
	target_side_length: number;
	img_max_size_mp: number;
	use_original_name_batch: boolean;
	use_upscaler_name_as_suffix: boolean;
	save_selected_only: boolean;
	save_write_log_csv: boolean;
	save_init_img: boolean;
	temp_dir: string;
	clean_temp_dir_at_start: boolean;
	save_incomplete_images: boolean;
	notification_audio: boolean;
	notification_volume: number;
	outdir_samples: string;
	outdir_txt2img_samples: string;
	outdir_img2img_samples: string;
	outdir_extras_samples: string;
	outdir_grids: string;
	outdir_txt2img_grids: string;
	outdir_img2img_grids: string;
	outdir_save: string;
	outdir_init_images: string;
	save_to_dirs: boolean;
	grid_save_to_dirs: boolean;
	use_save_to_dirs_for_ui: boolean;
	directories_filename_pattern: string;
	directories_max_prompt_words: number;
	ESRGAN_tile: number;
	ESRGAN_tile_overlap: number;
	realesrgan_enabled_models: string[];
	dat_enabled_models: string[];
	DAT_tile: number;
	DAT_tile_overlap: number;
	upscaler_for_img2img: string;
	set_scale_by_when_changing_upscaler: boolean;
	face_restoration: boolean;
	face_restoration_model: string;
	code_former_weight: number;
	face_restoration_unload: boolean;
	auto_launch_browser: string;
	enable_console_prompts: boolean;
	show_warnings: boolean;
	show_gradio_deprecation_warnings: boolean;
	memmon_poll_rate: number;
	samples_log_stdout: boolean;
	multiple_tqdm: boolean;
	enable_upscale_progressbar: boolean;
	print_hypernet_extra: boolean;
	list_hidden_files: boolean;
	disable_mmap_load_safetensors: boolean;
	hide_ldm_prints: boolean;
	dump_stacks_on_signal: boolean;
	profiling_explanation: string;
	profiling_enable: boolean;
	profiling_activities: string[];
	profiling_record_shapes: boolean;
	profiling_profile_memory: boolean;
	profiling_with_stack: boolean;
	profiling_filename: string;
	api_enable_requests: boolean;
	api_forbid_local_requests: boolean;
	api_useragent: string;
	unload_models_when_training: boolean;
	pin_memory: boolean;
	save_optimizer_state: boolean;
	save_training_settings_to_txt: boolean;
	dataset_filename_word_regex: string;
	dataset_filename_join_string: string;
	training_image_repeats_per_epoch: number;
	training_write_csv_every: number;
	training_xattention_optimizations: boolean;
	training_enable_tensorboard: boolean;
	training_tensorboard_save_images: boolean;
	training_tensorboard_flush_every: number;
	sd_model_checkpoint: string;
	sd_checkpoints_limit: number;
	sd_checkpoints_keep_in_cpu: boolean;
	sd_checkpoint_cache: number;
	sd_unet: string;
	enable_quantization: boolean;
	emphasis: string;
	enable_batch_seeds: boolean;
	comma_padding_backtrack: number;
	sdxl_clip_l_skip: boolean;
	CLIP_stop_at_last_layers: number;
	upcast_attn: boolean;
	randn_source: string;
	tiling: boolean;
	hires_fix_refiner_pass: string;
	sdxl_crop_top: number;
	sdxl_crop_left: number;
	sdxl_refiner_low_aesthetic_score: number;
	sdxl_refiner_high_aesthetic_score: number;
	sd3_enable_t5: boolean;
	sd_vae_explanation: string;
	sd_vae_checkpoint_cache: number;
	sd_vae: string;
	sd_vae_overrides_per_model_preferences: boolean;
	auto_vae_precision_bfloat16: boolean;
	auto_vae_precision: boolean;
	sd_vae_encode_method: string;
	sd_vae_decode_method: string;
	inpainting_mask_weight: number;
	initial_noise_multiplier: number;
	img2img_extra_noise: number;
	img2img_color_correction: boolean;
	img2img_fix_steps: boolean;
	img2img_background_color: string;
	img2img_editor_height: number;
	img2img_sketch_default_brush_color: string;
	img2img_inpaint_mask_brush_color: string;
	img2img_inpaint_sketch_default_brush_color: string;
	return_mask: boolean;
	return_mask_composite: boolean;
	img2img_batch_show_results_limit: number;
	overlay_inpaint: boolean;
	cross_attention_optimization: string;
	s_min_uncond: number;
	s_min_uncond_all: boolean;
	token_merging_ratio: number;
	token_merging_ratio_img2img: number;
	token_merging_ratio_hr: number;
	pad_cond_uncond: boolean;
	pad_cond_uncond_v0: boolean;
	persistent_cond_cache: boolean;
	batch_cond_uncond: boolean;
	fp8_storage: string;
	cache_fp16_weight: boolean;
	auto_backcompat: boolean;
	use_old_emphasis_implementation: boolean;
	use_old_karras_scheduler_sigmas: boolean;
	no_dpmpp_sde_batch_determinism: boolean;
	use_old_hires_fix_width_height: boolean;
	hires_fix_use_firstpass_conds: boolean;
	use_old_scheduling: boolean;
	use_downcasted_alpha_bar: boolean;
	refiner_switch_by_sample_steps: boolean;
	interrogate_keep_models_in_memory: boolean;
	interrogate_return_ranks: boolean;
	interrogate_clip_num_beams: number;
	interrogate_clip_min_length: number;
	interrogate_clip_max_length: number;
	interrogate_clip_dict_limit: number;
	interrogate_clip_skip_categories: any[];
	interrogate_deepbooru_score_threshold: number;
	deepbooru_sort_alpha: boolean;
	deepbooru_use_spaces: boolean;
	deepbooru_escape: boolean;
	deepbooru_filter_tags: string;
	extra_networks_show_hidden_directories: boolean;
	extra_networks_dir_button_function: boolean;
	extra_networks_hidden_models: string;
	extra_networks_default_multiplier: number;
	extra_networks_card_width: number;
	extra_networks_card_height: number;
	extra_networks_card_text_scale: number;
	extra_networks_card_show_desc: boolean;
	extra_networks_card_description_is_html: boolean;
	extra_networks_card_order_field: string;
	extra_networks_card_order: string;
	extra_networks_tree_view_style: string;
	extra_networks_tree_view_default_enabled: boolean;
	extra_networks_tree_view_default_width: number;
	extra_networks_add_text_separator: string;
	ui_extra_networks_tab_reorder: string;
	textual_inversion_print_at_load: boolean;
	textual_inversion_add_hashes_to_infotext: boolean;
	sd_hypernetwork: string;
	keyedit_precision_attention: number;
	keyedit_precision_extra: number;
	keyedit_delimiters: string;
	keyedit_delimiters_whitespace: string[];
	keyedit_move: boolean;
	disable_token_counters: boolean;
	include_styles_into_token_counters: boolean;
	return_grid: boolean;
	do_not_show_images: boolean;
	js_modal_lightbox: boolean;
	js_modal_lightbox_initially_zoomed: boolean;
	js_modal_lightbox_gamepad: boolean;
	js_modal_lightbox_gamepad_repeat: number;
	sd_webui_modal_lightbox_icon_opacity: number;
	sd_webui_modal_lightbox_toolbar_opacity: number;
	gallery_height: string;
	open_dir_button_choice: string;
	compact_prompt_box: boolean;
	samplers_in_dropdown: boolean;
	dimensions_and_batch_together: boolean;
	sd_checkpoint_dropdown_use_short: boolean;
	hires_fix_show_sampler: boolean;
	hires_fix_show_prompts: boolean;
	txt2img_settings_accordion: boolean;
	img2img_settings_accordion: boolean;
	interrupt_after_current: boolean;
	localization: string;
	quicksettings_list: string[];
	ui_tab_order: any[];
	hidden_tabs: any[];
	ui_reorder_list: any[];
	gradio_theme: string;
	gradio_themes_cache: boolean;
	show_progress_in_title: boolean;
	send_seed: boolean;
	send_size: boolean;
	enable_reloading_ui_scripts: boolean;
	infotext_explanation: string;
	enable_pnginfo: boolean;
	save_txt: boolean;
	add_model_name_to_info: boolean;
	add_model_hash_to_info: boolean;
	add_vae_name_to_info: boolean;
	add_vae_hash_to_info: boolean;
	add_user_name_to_info: boolean;
	add_version_to_infotext: boolean;
	disable_weights_auto_swap: boolean;
	infotext_skip_pasting: any[];
	infotext_styles: string;
	show_progressbar: boolean;
	live_previews_enable: boolean;
	live_previews_image_format: string;
	show_progress_grid: boolean;
	show_progress_every_n_steps: number;
	show_progress_type: string;
	live_preview_allow_lowvram_full: boolean;
	live_preview_content: string;
	live_preview_refresh_period: number;
	live_preview_fast_interrupt: boolean;
	js_live_preview_in_modal_lightbox: boolean;
	prevent_screen_sleep_during_generation: boolean;
	hide_samplers: any[];
	eta_ddim: number;
	eta_ancestral: number;
	ddim_discretize: string;
	s_churn: number;
	s_tmin: number;
	s_tmax: number;
	s_noise: number;
	sigma_min: number;
	sigma_max: number;
	rho: number;
	eta_noise_seed_delta: number;
	always_discard_next_to_last_sigma: boolean;
	sgm_noise_multiplier: boolean;
	uni_pc_variant: string;
	uni_pc_skip_type: string;
	uni_pc_order: number;
	uni_pc_lower_order_final: boolean;
	sd_noise_schedule: string;
	skip_early_cond: number;
	beta_dist_alpha: number;
	beta_dist_beta: number;
	postprocessing_enable_in_main_ui: any[];
	postprocessing_disable_in_extras: any[];
	postprocessing_operation_order: any[];
	upscaling_max_images_in_cache: number;
	postprocessing_existing_caption_action: string;
	disabled_extensions: any[];
	disable_all_extensions: string;
	restore_config_state_file: string;
	sd_checkpoint_hash: string;
	enable_prompt_comments: boolean;
};

/**
 * Represents the Command Line Interface flags
 */
export type CmdFlags = {
	f: boolean;
	update_all_extensions: boolean;
	skip_python_version_check: boolean;
	skip_torch_cuda_test: boolean;
	reinstall_xformers: boolean;
	reinstall_torch: boolean;
	update_check: boolean;
	test_server: boolean;
	log_startup: boolean;
	skip_prepare_environment: boolean;
	skip_install: boolean;
	dump_sysinfo: boolean;
	loglevel: string;
	do_not_download_clip: boolean;
	data_dir: string;
	models_dir: string;
	config: string;
	ckpt: string;
	ckpt_dir: string;
	vae_dir: string;
	gfpgan_dir: string;
	gfpgan_model: string;
	no_half: boolean;
	no_half_vae: boolean;
	no_progressbar_hiding: boolean;
	max_batch_count: number;
	embeddings_dir: string;
	textual_inversion_templates_dir: string;
	hypernetwork_dir: string;
	localizations_dir: string;
	allow_code: boolean;
	medvram: boolean;
	medvram_sdxl: boolean;
	lowvram: boolean;
	lowram: boolean;
	always_batch_cond_uncond: boolean;
	unload_gfpgan: boolean;
	precision: string;
	upcast_sampling: boolean;
	share: boolean;
	ngrok: string;
	ngrok_region: string;
	ngrok_options: Record<string, any>;
	enable_insecure_extension_access: boolean;
	codeformer_models_path: string;
	gfpgan_models_path: string;
	esrgan_models_path: string;
	bsrgan_models_path: string;
	realesrgan_models_path: string;
	dat_models_path: string;
	clip_models_path: string;
	xformers: boolean;
	force_enable_xformers: boolean;
	xformers_flash_attention: boolean;
	deepdanbooru: boolean;
	opt_split_attention: boolean;
	opt_sub_quad_attention: boolean;
	sub_quad_q_chunk_size: number;
	sub_quad_kv_chunk_size: string;
	sub_quad_chunk_threshold: string;
	opt_split_attention_invokeai: boolean;
	opt_split_attention_v1: boolean;
	opt_sdp_attention: boolean;
	opt_sdp_no_mem_attention: boolean;
	disable_opt_split_attention: boolean;
	disable_nan_check: boolean;
	use_cpu: any[];
	use_ipex: boolean;
	disable_model_loading_ram_optimization: boolean;
	listen: boolean;
	port: string;
	show_negative_prompt: boolean;
	ui_config_file: string;
	hide_ui_dir_config: boolean;
	freeze_settings: boolean;
	freeze_settings_in_sections: string;
	freeze_specific_settings: string;
	ui_settings_file: string;
	gradio_debug: boolean;
	gradio_auth: string;
	gradio_auth_path: string;
	gradio_img2img_tool: string;
	gradio_inpaint_tool: string;
	gradio_allowed_path: string[];
	opt_channelslast: boolean;
	styles_file: any[];
	autolaunch: boolean;
	theme: string;
	use_textbox_seed: boolean;
	disable_console_progressbars: boolean;
	enable_console_prompts: boolean;
	vae_path: string;
	disable_safe_unpickle: boolean;
	api: boolean;
	api_auth: string;
	api_log: boolean;
	nowebui: boolean;
	ui_debug_mode: boolean;
	device_id: string;
	administrator: boolean;
	cors_allow_origins: string;
	cors_allow_origins_regex: string;
	tls_keyfile: string;
	tls_certfile: string;
	disable_tls_verify: string;
	server_name: string;
	gradio_queue: boolean;
	no_gradio_queue: boolean;
	skip_version_check: boolean;
	no_hashing: boolean;
	no_download_sd_model: boolean;
	subpath: string;
	add_stop_route: boolean;
	api_server_stop: boolean;
	timeout_keep_alive: number;
	disable_all_extensions: boolean;
	disable_extra_extensions: boolean;
	skip_load_model_at_start: boolean;
	unix_filenames_sanitization: boolean;
	filenames_max_length: number;
	no_prompt_history: boolean;
	ldsr_models_path: string;
	lora_dir: string;
	lyco_dir_backcompat: string;
	scunet_models_path: string;
	swinir_models_path: string;
};

/**
 * Represents the Sampler object
 */
export type Sampler = {
	name: string;
	aliases: string[];
	options: Record<string, string>;
};
/**
 * Represents the Base SD Information object
 */
export type SDInfoBase = {
	name: string;
	options: Record<string, string>;
	model_name: string;
	scale: number;
	title: string;
	filename: string;
	path: string;
};

/**
 * Represents the Scheduler object
 */
export type Scheduler = Pick<SDInfoBase, "name"> & {
	aliases: string[];
	default_rho: number;
	need_inner_model: boolean;
};

/**
 * Represents the Upscaler object
 */
export type UpScaler = Pick<SDInfoBase, "name" | "model_name" | "scale"> & {
	model_path: string;
	model_url: string;
};

/**
 * Represents the Latent Upscale Mode object
 */
export type LatentUpscaleMode = Pick<SDInfoBase, "name">;

/**
 * Represents the SD Model object
 */
export type SdModel = Pick<SDInfoBase, "model_name" | "filename"> & {
	title: string;
	hash: string;
	sha256: string;
	config: string;
};

/**
 * Represents the SD VAE object
 */
export type SdVae = Pick<SDInfoBase, "model_name" | "filename">;

/**
 * Represents the SD Hyper Network object
 */
export type HyperNetwork = Pick<SDInfoBase, "name" | "path">;

/**
 * Represents the SD Face Restorer object
 */
export type FaceRestorer = Pick<SDInfoBase, "name"> & {
	cmd_dir: string;
};

/**
 * Represents the SD Real ESRGAN object
 */
export type RealEsrganModel = Pick<SDInfoBase, "name" | "path"> & {
	scale: number;
};

/**
 * Represents the SD Prompt Style object
 */
export type PromptStyle = Pick<SDInfoBase, "name"> & {
	prompt: string;
	negative_prompt: string;
};

/**
 * Represents the Embedding Model Name
 */
export type EmbeddingModelName = string;

/**
 * Represents the Embedding Model Properties
 */
export type EmbeddingModelProp = {
	step: number;
	sd_checkpoint: string;
	sd_checkpoint_name: string;
	shape: number;
	vectors: number;
};

/**
 * Represents the Embedding Model object
 */
export type Embedding<T extends EmbeddingModelName> = {
	loaded: Record<T, EmbeddingModelProp>;
	skipped: Record<T, EmbeddingModelProp>;
};

/**
 * Represents the Memory Information Properties
 */
export type MemoryInfoProps = {
	current: number;
	peak: number;
};

/**
 * Represents the Cuda Memory Information Properties
 */
export type MemoryCudaProps = {
	system: MemoryRamProps;
	active: MemoryInfoProps;
	allocated: MemoryInfoProps;
	reserved: MemoryInfoProps;
	inactive: MemoryInfoProps;
	events: {
		retries: number;
		oom: number;
	};
};

/**
 * Represents the RAM Memory Information Properties
 */
export type MemoryRamProps = {
	free: number;
	used: number;
	total: number;
};

/**
 * Represents the Memory Information object
 */
export type Memory = {
	ram: MemoryRamProps | Record<string, never>;
	cuda: MemoryCudaProps | Record<string, never>;
};

/**
 * Represents the SD Script object
 */
export type Scripts = {
	txt2img: string[];
	img2img: string[];
};

/**
 * Represents the SD Script Information object
 */
export type ScriptInfo = Pick<SDInfoBase, "name"> & {
	is_alwayson: boolean;
	is_img2img: boolean;
	args: {
		label: string;
		value: string;
		minimum: string;
		maximum: string;
		step: string;
		choices: string[];
	}[];
};

/**
 * Represents the Extension object
 */
export type Extension = Pick<SDInfoBase, "name"> & {
	remote: string;
	branch: string;
	commit_hash: string;
	version: string;
	commit_date: string;
	enabled: boolean;
};
