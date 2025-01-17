/**
 * miniPaint - https://github.com/viliusle/miniPaint
 * author: Vilius L.
 */

//css
import './../css/reset.css';
import './../css/utility.css';
import './../css/component.css';
import './../css/layout.css';
import './../css/menu.css';
import './../css/print.css';
import './../../node_modules/alertifyjs/build/css/alertify.min.css';
//js
import app from './app.js';
import config from './config.js';
import './core/components/index.js';
import Base_gui_class from './core/base-gui.js';
import Base_layers_class from './core/base-layers.js';
import Base_tools_class from './core/base-tools.js';
import Base_state_class from './core/base-state.js';
import Base_search_class from './core/base-search.js';
import File_open_class from './modules/file/open.js';
import File_save_class from './modules/file/save.js';
import * as Actions from './actions/index.js';

window.addEventListener('load', function (e) {
	// Initiate app
	var Layers = new Base_layers_class();
	var Base_tools = new Base_tools_class(true);
	var GUI = new Base_gui_class();
	var Base_state = new Base_state_class();
	var File_open = new File_open_class();
	var File_save = new File_save_class();
	var Base_search = new Base_search_class();
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const default_image = urlParams.get('default_file_path')
	var default_image_json = '';
	const load_json = urlParams.get('load_json')

	// Register singletons in app module
	app.Actions = Actions;
	app.Config = config;
	app.FileOpen = File_open;
	app.FileSave = File_save;
	app.GUI = GUI;
	app.Layers = Layers;
	app.State = Base_state;
	app.Tools = Base_tools;
	config.COLORS_SWATCH_CUSTOM = 1; // 1 means enabled 0 means disabled
	config.COLORS_SWATCH = (document.getElementById("swatches_colors").value).split(",");
	// console.log("Type: "+typeof document.getElementById("swatches_colors").value)
	// console.log("Type: "+typeof (document.getElementById("swatches_colors").value).split(","))
	// console.log((document.getElementById("swatches_colors").value).split(","))
	// Register as global for quick or external access
	window.Layers = Layers;
	window.AppConfig = config;
	window.State = Base_state;
	window.FileOpen = File_open;
	window.FileSave = File_save;

	// console.log(default_image)
	if (default_image && typeof default_image.length !== 'undefined' && !load_json) {
		let default_image_base64 = ''
		// console.log(default_image)
		var base64_api = document.getElementById("base64_api").value;
		base64_api += "?url="+default_image;
			fetch(base64_api)
			// Converting to JSON
			.then(response => response.json())
			// Displaying results to console
			.then(json => {
				if (json){
					default_image_base64 = json.data;
					const data_image = 'data:image/png;base64,'+default_image_base64;
					if (default_image_base64 !== '')
						FileOpen.file_open_data_url_handler(data_image);
				}
			})
			.catch(err => {

			});
	}
	else{
		var load_json_api = document.getElementById("load_json_api").value;
		fetch(load_json_api)
			// Converting to JSON
			.then(response => response.json())
			// Displaying results to console
			.then(json => {
				if (json){
					console.log("Loading JSON: "+json.data)
					File_open.load_json(json.data)
				}
			})
			.catch(err => {

			});
	}
	// Render all
	GUI.init();
	Layers.init();
	var divs = document.querySelectorAll('.swatch');

	for (let i = 0; i < divs.length; ++i) {
		divs[i].click();
	};
}, false);
