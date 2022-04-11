


const multer  = require('multer')


const SETTINGS = {

	UPLOAD_BASEDIR:'uploads/',
	DB_URL:'mongodb://localhost:27017/user',
	CUSTOM_STORAGE:multer.diskStorage({
		destination: function (req: any, _file: any, cb: any) {
			cb(null, SETTINGS.UPLOAD_BASEDIR)
		},
		filename: function (_req: any, file: any, cb: any) {
			let ext = '';
			if (file.originalname.split(".").length>1)
					ext = file.originalname.substring(file.originalname.lastIndexOf('.'),
					file.originalname.length);
			cb(null, Date.now() + ext)
		}
	})
}




export { SETTINGS }