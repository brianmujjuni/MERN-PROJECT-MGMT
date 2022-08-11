//const {projects, clients} = require('../sampleData')

const Project = require('../models/Project')
const Client = require('../models/Client')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema ,GraphQLList} = require('graphql')

//Client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields:() => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields:() => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client:{
            type: ClientType,
            resolve(parent,args){
                //return clients.find(client => client.id === parent.clientId)
                return clients.findById(parent.clientId)
            }
        }
    })
})  


const RootQuery = new GraphQLObjectType({
    name: 'RootQuerytType',
    fields:{
        //get all clients
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent,args){
                //return clients
                return Client.find()
            }
        },
        //get single client
        client:{
            type: ClientType,
            args:{ id: { type: GraphQLID }},
            resolve(parent, args){
               //return clients.find(client => client.id === args.id)
               return Client.findById(args.id); 
            },
        },
         //get all projects
         projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent,args){
                //return projects
                return Project.find()
            }
        },
        //get single client
        project:{
            type: ProjectType,
            args:{ id: { type: GraphQLID }},
            resolve(parent, args){
               //return projects.find(project => project.id === args.id) 
               return Project.findById(args.id);
            },
        },
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,  
})