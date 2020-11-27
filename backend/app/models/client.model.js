module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      modelo_primario:      String,
      modelo_secundario:   [String],
      guardar_metadata:     Boolean,
      estado:               Boolean,
      url: [String],
      salida: String
      /*video:          { type: {
        tipo:  { type: String },
        url:     [{ type: String }]
      }}*/
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