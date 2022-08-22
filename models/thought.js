const { Schema, model } = require('mongoose');
const ReactionSchema = requier('./reaction');
const dateFormat = requier('../utils/dataFormat');
const thought = model('Thought', thoughtSchema);
const thoughtSchema = new Schema({
    type: String,
    maxlenght: 300,
    required: true 
},
user, {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
},
{
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
},
{
    username: {
        type: String,
        required: true
    }
},
reactions, [{
    type: Schema.Types.ObjectId,
    ref:'rection'
}],
{
    toJSON: {
        getters: true
    },
    id: false
}
);
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reaction.maxlenght;
});




model.exports = thought;