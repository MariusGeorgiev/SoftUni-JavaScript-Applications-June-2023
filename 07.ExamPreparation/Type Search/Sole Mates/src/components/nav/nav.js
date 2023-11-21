export class NavComponent {
    constructor(authServive, renderHandler, templateFunction, router) {
        // this.sessionService = sessionService;
        this.authServive = authServive;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.router = router;
        this.logoutHandler = this._logoutHandler.bind(this);
        this.showView = this._showView.bind(this);
    }

    async _showView(ctx, next) {
        let isUserLoggedIn = this.authServive.isUserLoggedIn();
        let template = this.templateFunction(isUserLoggedIn, this.logoutHandler)
        this.renderHandler(template);
        next();
    }

    async _logoutHandler() {
        await this.authServive.logout();
        this.router.navigate('/dashboard');
    }
}