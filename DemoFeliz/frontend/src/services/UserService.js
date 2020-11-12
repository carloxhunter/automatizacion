import http from "./http-common";

class UserService{

	getAllUsers(){
		return http.get("/users");
	}

	getUserById(id){
		return http.get(`/users/${id}`)
	}

	addNewUser(data){
		return http.post("/users", data);
	}

	updateUser(id,data){
		return http.put(`/users/${id}`,data)
	}

	deleteUser(id) {
    	return http.delete(`/users/${id}`);
  	}

  	deleteAllUsers() {
    	return http.delete(`/users`);
  	}
}
export default new UserService();