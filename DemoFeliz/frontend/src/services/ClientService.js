import http from "./http-common";

class ClientService{

	getAllClient(){
		return http.get("/client");
	}

	getClientById(id){
		return http.get(`/client/${id}`);
	}

	addNewClient(data){
		return http.post("/client", data);
	}

	updateClient(id,data){
		return http.put(`/client/${id}`,data)
	}

	deleteClient(id){
		return http.delete(`/client/${id}`);
	}

	deleteAllClient() {
    	return http.delete(`/client`);
  	}

}
export default new ClientService();