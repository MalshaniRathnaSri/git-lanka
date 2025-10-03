const mongoose = require('mongoose')

const WomenCareuselSchema = new mongoose.Schema(
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

export default mongoose.models.WomenCareusel || mongoose.model('WomenCareusel', WomenCareuselSchema);

