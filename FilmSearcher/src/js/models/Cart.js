import uniqid from 'uniqid';

export default class Cart{
    constructor(){
        this.moviesItems = [];
    }
    addIteam(num,title,price,poster){
        const item = {
            //this.num = num;
            id:uniqid(),
            num,
            title,
            price,
            poster
        }
        this.moviesItems.push(item);
        this.persistDataLocally();
        return item;
    }
    showList(){
        return this.moviesItems;
    }
    deleteItem(id){
        const index = this.moviesItems.findIndex(curr =>curr.id === id);
        this.moviesItems.splice(index,1);
        this.persistDataLocally();
    }
    updateNumMovies(id, newNum){
        this.moviesItems.find(curr => curr.id === id).num = newNum;
    }
    calcPrice(numTickets){
        this.price = parseInt(numTickets)*10;
    }
    persistDataLocally(){
        localStorage.setItem('cart',JSON.stringify(this.moviesItems));
    }
    restoreDataLocalStorage(){
        const data = JSON.parse(localStorage.getItem('cart'));
        if(data) this.moviesItems = data;
    }
}