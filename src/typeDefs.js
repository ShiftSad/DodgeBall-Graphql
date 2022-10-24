import {gql} from "apollo-server-express";

const typeDefs = gql`
    # I'm getting a little confused so, comments it is.
    
    # This is the type of the user
    type User {
        identifier:  Identifier!
        isOriginal:  Boolean # Enable this if you want to use the UUID, the player will remain it's stats even after a name change.
        isFloodgate: Boolean # Is logging from bedrock edition, may be useful for future updates
        stats:       Stats   # Should be fine being null, everything defaults to 0
    }
    
    # On user creation, you NEED to provide the name, the rest is optional
    type Identifier {
        id:   ID     # This field is auto generated, so it's not required
        name: String # Only thing that is actually required
        uuid: String # Defaults to null, only needed if the user is original
    }
    
    type Stats {
        transaction: Transaction
        gameInfo:    GameInfo   
    }
    
    type Transaction {
        money: Float
    }
    
    # This really is self explanatory
    type GameInfo {
        wins:   Int
        losses: Int
        kills:  Int
        deaths: Int
    }
    
    input UserInput {
        name:        String!
        uuid:        String!
        isOriginal:  Boolean
        isFloodgate: Boolean
        stats:       StatsInput
    }
    
    input StatsInput {
        transaction: TransactionInput
        gameInfo:    GameInfoInput
    }
    
    input TransactionInput {
        money: Int
    }
    
    input GameInfoInput {
        wins: Int
    }

    type Query {
        getAllUsers: [ User ]
        getUser      (id: ID, name: String, uuid: String): User
    }
    
    type Mutation {
        createUser(user: UserInput): User
        deleteUser(id: ID, name: String, uuid: String): User
        updateUser(id: ID, name: String, uuid: String, user: UserInput!): User
    }
`;

module.exports = typeDefs;