import User from "./models/User.model";

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find();
        },
        getUser: async (parent, args) => {
            if (args.id) return User.findById(args.id);
            if (args.name) return User.findOne({name: args.name});
            if (args.uuid) return User.findOne({uuid: args.uuid});
        }
    },

    Mutation: {
      createUser: async (parent, args, _context, _info) => {
          if (!args.user.identifier.name) throw new Error("Name is required");
          if (args.user.isOriginal && !args.user.identifier.uuid) throw new Error("UUID is required if the user is original");
          if (args.user.isFloodgate && !args.user.identifier.uuid) throw new Error("UUID is required if the user is floodgate");
          if (args.user.identifier.id) throw new Error("ID is auto generated, do not include it in the input");
          // After that, we are certain that the user input is valid, so we can create the user

          const { identifier, isOriginal, isFloodgate } = args.user;

          // TODO -> Help, this is long. I'm not sure if there is a better way to do this
          // If the user is 'special', we need to create a new user with the uuid
          if (isOriginal || isFloodgate) {
              const user = new User({
                  identifier: {
                      name: identifier.name,
                      uuid: identifier.uuid,
                  },
                  isOriginal,  // This should work, since it is a boolean
                  isFloodgate, // will set the value accordingly
              });
              await user.save();
              return user;
          }
          const user = new User({
              identifier: {
                  name: identifier.name
              }
          });
          await user.save();
          return user;
      },
      deleteUser: async (parent, args) => { // TODO? -> Maybe a check if the user exists, but looks like a waste of resources
          if (args.identifier.name) return User.findOneAndDelete({name: args.identifier.name});
          if (args.identifier.uuid) return User.findOneAndDelete({uuid: args.identifier.uuid});
      },
      updateUser: async (parent, args, _context, _info) => {
          // TODO -> Kinda cringe tbh, 2 calls to the db?
          if (args.identifier.name) {
              const user = await User.findOne({name: args.identifier.name});
              user.stats = args.stats;
              return User.findOneAndUpdate({name: args.identifier.name}, user, { new: true });
          }
          const user = await User.findOne({name: args.identifier.uuid});
          user.stats = args.stats;
          return User.findOneAndUpdate({uuid: args.identifier.uuid}, args.stats, { new: true });
      }
    }
}

module.exports = resolvers;