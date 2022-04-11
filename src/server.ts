

import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { graphqlSchema } from './graphql/schema'
import mongoose from 'mongoose';
import { SETTINGS } from './settings';



mongoose.connect(SETTINGS.DB_URL);

const app = express()
const multer  = require('multer')
const upload = multer({
	dest:SETTINGS.UPLOAD_BASEDIR,
	storage:SETTINGS.CUSTOM_STORAGE
})

var cors = require('cors')




// Settins
app.set('port',8000)

// Midelwares
app.use( express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));

app.use('/graphql',graphqlHTTP({
	graphiql:true,
	schema:graphqlSchema
}))


// Urls

app.post('/api/v1/upload/',upload.single('uploaded_file'),(
	request:any,response
) => {
	response.send({ 'file-name':request.file.filename })
})


app.get('/media/:media',(request,response) => {
	response.download(SETTINGS.UPLOAD_BASEDIR+request.params.media)
})





app.listen(app.get('port'),() => {
	console.log(`Server on port ${app.get('port')}`)
})


