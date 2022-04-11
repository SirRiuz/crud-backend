

import { 
	GraphQLID,
	GraphQLList,
	GraphQLObjectType,
	GraphQLString 
} from "graphql";
import { userModel } from "../db/scheme";


const type = new GraphQLList(new GraphQLObjectType({
	name:'user',
	fields:{
		_id:{ type:GraphQLID },
		userName:{ type:GraphQLString },
		firstName:{ type:GraphQLString },
		lastName:{ type:GraphQLString },
		password:{ type:GraphQLString },
		profileImage:{ type:GraphQLString }
	}
}))


const query = new GraphQLObjectType({
	
	name:'queryTipes',
	fields:{

		usersList:{
			type,
			resolve:async (_,args) => {
				var userList = await userModel.find()
				return userList
			}
		},

		search:{
			type,
			args:{ query:{type:GraphQLString} },
			resolve:async (_,args) => {
				var result = await userModel.find({
					userName: {'$regex': args.query
				}})
				return result
			}
		}

	}
})


export { query }