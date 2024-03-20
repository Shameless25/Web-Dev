import { key,api } from "../config/config";
export default class Search{
    
    constructor(query){
        this.query = query;
    }

    async getSearchResult(){
        try{
            const result = await fetch(`${api}apikey=${key}&s=${this.query}`)
            const data = await result.json()
            this.movies = data.Search;
            // console.log(this.movies);
        }catch(error){
            alert(error);
        }
    }
}
