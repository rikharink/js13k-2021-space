export class WebmonetizationManger {
    public isMonetized: boolean = false;

    constructor() {
        if (document.monetization) {
            if (!(document.monetization.state === 'started' || document.monetization.state === 'stopped')) {
                document.monetization.addEventListener('monetizationstart', this._monetizationStarted.bind(this));
            }
            else {
                this.isMonetized = document.monetization.state === 'started';
                console.debug('monetization enabled:', this.isMonetized);
            }
        }
    }

    private _monetizationStarted() {
        this.isMonetized = true;
        console.debug('monetization enabled:', this.isMonetized);
    }
}