module.exports = mongoose => {
	var schema = mongoose.Schema(
		{
			street: String,
			suite: String,
			city: String,
			zipcode: String
		},
		{ timestamps: true }
	)

	schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

	const Adres = mongoose.model("adres",schema);
	return Adres;
}