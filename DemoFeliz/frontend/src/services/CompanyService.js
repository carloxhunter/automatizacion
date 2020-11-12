import http from "./http-common";

class CompanyService{

	getAllCompany(){
		return http.get("/company");
	}

	getCompanyById(id){
		return http.get(`/company/${id}`);
	}

	addNewCompany(data){
		return http.post("/company", data);
	}

	updateCompany(id,data){
		return http.put(`/company/${id}`,data)
	}

	deleteCompany(id){
		return http.delete(`/company/${id}`);
	}

	deleteAllCompany() {
    	return http.delete(`/company`);
  	}

}
export default new CompanyService();