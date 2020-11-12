module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        model_primary: String,
        model_secundary: String,
        save_meta: Boolean,
        camara_id : Number/*,
        video : {
            type: String,
            path: String, 
            url: String, 
            width:  Number, 
            height: Number
        }*/
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Client = mongoose.model("client", schema);
    return Client;
  };