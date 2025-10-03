const mongoose = require('mongoose')

const MenCareuselSchema = new mongoose.Schema(
    {
        image: {type: String, require: true },
        topHeading: {type: String, require: true},
        subHeading: {type: String},
        description: {type: String}
    },
    {
        timestamps: true
    }
);

export default mongoose.models.MenCareusel || mongoose.model('MenCareusel', MenCareuselSchema);

