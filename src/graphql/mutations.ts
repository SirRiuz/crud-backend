

import { GraphQLObjectType,GraphQLString } from "graphql";
import { userModel } from "../db/scheme";


const mutation = new GraphQLObjectType({
	name:'MutationType',
	fields:{

		updateData:{
			type:GraphQLString,
			args:{
				userId:{type:GraphQLString},
				userName:{type:GraphQLString},
				firstName:{type:GraphQLString},
				lastName:{type:GraphQLString},
				password:{type:GraphQLString},
				profileImage:{type:GraphQLString,defaultValue:null},
			},
			resolve:async (_,args) => {
				var userObject = await userModel.findOne({
					_id:args.userId
				})
				userObject.userName = args.userName
				userObject.firstName = args.firstName
				userObject.lastName = args.lastName
				userObject.password = args.password
				userObject.profileImage = args.profileImage
				await userObject.save()
			}
		},
		
		createUser:{
			type:GraphQLString,
			args:{
				userName:{type:GraphQLString},
				firstName:{type:GraphQLString},
				lastName:{type:GraphQLString},
				password:{type:GraphQLString},
				profileImage:{type:GraphQLString,defaultValue:null},
			},
			resolve:async (_,args) => {
				var newUser = new userModel({
					userName:args.userName as string,
					firstName:args.firstName as string,
					lastName:args.lastName as string,
					password:args.password as string,
					profileImage:args.profileImage as string,
				})
				newUser = await newUser.save()
				return 'created'
			}
		},

		deleteUser:{
			type:GraphQLString,
			args:{ id:{type:GraphQLString} },
			resolve:async (_,args) => {
				await userModel.findOne({
					_id:args.id
				}).deleteOne().exec()
				return 'deleted'
			}
		}

	}
})


export { mutation }


