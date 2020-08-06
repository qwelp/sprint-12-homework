export class CardList {

    constructor(container, items, createCart) {
        this.container = container;
        this.items = items;
        this.createCart = createCart;
    }

    addCard(item, id = false) {
        const cart = this.createCart(item);

        if(id) {
            cart.dataset.id = id;
        }

        this.container.append(cart);
    }

    render() {
        this.items.forEach(item => {
            this.addCard(item);
        });
    }
}