const mongoose = require('mongoose')

const MainCareuselSchema = new mongoose.Schema(
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

export default mongoose.models.MainCareusel || mongoose.model('MainCareusel', MainCareuselSchema);

