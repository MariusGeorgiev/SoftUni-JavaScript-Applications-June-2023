
export class DashboardComponent {
    constructor(shoeServive, renderHandler, templateFunction) {
        this.shoeServive = shoeServive;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.showView = this._showView.bind(this);
    }

    async _showView() {
        let shoes = await this.shoeServive.getAll()
        let template = this.templateFunction(shoes)
        this.renderHandler(template);
    }

    
}