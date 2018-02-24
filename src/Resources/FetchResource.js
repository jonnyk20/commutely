export default class FetchResource {
  static callModo(query) {
    return new Promise((resolve, reject) => {
      fetch(`https://bookit.modo.coop/api/v2/${query}`, { method: 'GET' })
        .then(response => {
          response.json().then(data => {
            resolve(data);
          });
        })
        .catch(response => {
          response.json().then(data => {
            reject(data.errors);
          });
        });
    });
  }
}
