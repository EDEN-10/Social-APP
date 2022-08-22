const thought = require ("./thought");
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            requied: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
            unique: true,
        },
        thoughts: [
            {
                type: Schema.Type.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Type.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
userSchema.virtua('friendCount').get(function(){
    return this.friends.lenght;
});

userSchema.pre("findOneAndDelet", {document: false, query: true}, async function(){
    console.log(doc.username);
    console.group("user pre-delete");
    const doc = await this.model.findOne(this.getFilter());
    await thought.deleteMany({ username: doc.username});
});
const user = model('user', userSchema);
module.export = User; 