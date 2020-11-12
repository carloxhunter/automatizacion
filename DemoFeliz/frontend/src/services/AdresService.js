import http from "./http-common";

class AddressService{

	getAllAddress(){
		return http.get("/adres");
	}

	getAddressById(id){
		return http.get(`/adres/${id}`);
	}

	addNewAddress(data){
		return http.post("/adres", data);
	}

	updateAddress(id,data){
		return http.put(`/adres/${id}`,data)
	}

	deleteAddress(id){
		return http.delete(`/adres/${id}`);
	}

	deleteAllAddress() {
    	return http.delete(`/adres`);
  	}

}
export default new AddressService();