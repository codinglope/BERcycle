class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList() {
    return axios.get(`${this.BASE_URL}/characters`);

  }

getOneRegister(id){
  return axios.get(`${this.BASE_URL}/characters/${id}`);
}

createOneRegister(){
  axios.post(`${this.BASE_URL}/characters/${characterId}`,{
    name,
    occupation,
    weapon,
    cartoon
  });
}
updateOneRegister(){}
deleteOneRegister(){}

};