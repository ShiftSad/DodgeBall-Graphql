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
      createUser: async (parent, args, context, info) => {
        const { name, uuid } = args.user;
        const user = new User({ name, uuid });
        await user.save();
        return user;
      },
      deleteUser: async (parent, args) => {
          if (args.id) return User.findByIdAndDelete(args.id);
          if (args.name) return User.findOneAndDelete({name: args.name});
          if (args.uuid) return User.findOneAndDelete({uuid: args.uuid});
      },
      updateUser: async (parent, args, context, info) => {
          if (args.id) return User.findByIdAndUpdate(args.id, args.user, {new: true});
          if (args.name) return User.findOneAndUpdate({name: args.name}, args.user, {new: true});
          if (args.uuid) return User.findOneAndUpdate({uuid: args.uuid}, args.user, {new: true});
      }
    }
}

module.exports = resolvers;