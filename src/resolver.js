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
      deleteUser: async (parent, args) => {
          if (args.id) return User.findByIdAndDelete(args.id);
          if (args.name) return User.findOneAndDelete({name: args.name});
          if (args.uuid) return User.findOneAndDelete({uuid: args.uuid});
      },
      updateUser: async (parent, args, _context, _info) => {
          if (args.id) return User.findByIdAndUpdate(args.id, args.user, {new: true});
          if (args.name) return User.findOneAndUpdate({name: args.name}, args.user, {new: true});
          if (args.uuid) return User.findOneAndUpdate({uuid: args.uuid}, args.user, {new: true});
      }
    }
}

module.exports = resolvers;