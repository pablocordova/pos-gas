import * as mongoose from 'mongoose';

export class Sale{
    constructor(
        public date: String,
        public clientid: mongoose.Schema.Types.ObjectId,
        public gassell: Number,
        public gasreceived: Number,
        public totalpaid: Number,
        public totalreal: Number,
        public remark: String
    ){}
}