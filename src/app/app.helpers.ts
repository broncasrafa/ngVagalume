export class Helpers {

    static handleError(err: any): Promise<any> {
      return Promise.reject(err.message || err);
    }
}