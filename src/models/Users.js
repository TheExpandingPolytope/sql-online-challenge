const mongoose = require("mongoose");

const ThirdPartyProviderSchema = new mongoose.Schema({
    provider_name: {
        type: String,
        default: null
    },
    provider_id: {
        type: String,
        default: null
    },
    provider_data: {
        type: {},
        default: null
    }
})

// Create Schema
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        },
        queries: {
            type: String,
            default: `{"data":[
                {
                    "name":"Example INSERT",
                    "code": "INSERT INTO artists (name) VALUES('Bud cool');"
                },
                {
                    "name":"Example SELECT",
                    "code":" SELECT ArtistId, Name FROM Artists ORDER BY ArtistId DESC;"
                }
            ]}`
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { strict: false }
);

module.exports = User = mongoose.model("users", UserSchema);