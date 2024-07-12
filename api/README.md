# API Folder

This contains a basic structure for api hook generator functions. One library that inspired this was [urql](https://github.com/urql-graphql/urql) and if you are using GraphQL, then take a look at it. If using GRPC, Open API, or ConnectRPC, this interface can be using to interact with generated code. 

I needed to add something here to support the progress controls and get this demo working without too many opinions about the backend or orchestration layer. You should expect to glue this together as needed for your tech stack.