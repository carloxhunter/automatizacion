module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name:    String,
        token:   String,
        puerto:  Number   
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      object.name= name;
      object.token=token;
      object.puerto=puerto;
      return object;
    });
  
    const Docker = mongoose.model("docker", schema);
    return Docker;
  };