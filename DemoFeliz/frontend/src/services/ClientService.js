//import httpCommon from "./http-common";
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

	upDeepstream(data){
		return http.post("/exec/bash", data);
	}

	finishalldocker(data){
		return http.post(`/exec/shutall`, data);
	}

	finishIdDocker(data){
		return http.post(`/exec/shutdocker`, data);
	}
}
export default new ClientService();