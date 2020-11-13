import http from "./http-common";

class CompanyService{

	getAllCompany(){
		return http.get("/company");
	}

	getCompanyById(id){
		return http.get(`/company/${id}`);
	}

	addNewCompany(data){
		console.log(http.post("/company", data))
		console.log(JSON.stringify(http.get("/company")))
		
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