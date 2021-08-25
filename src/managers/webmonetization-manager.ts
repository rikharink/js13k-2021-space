export class WebmonetizationManger {
  public isMonetized: boolean = false;

  constructor() {
    if (document.monetization) {
      if (
        !(
          document.monetization.state === 'started' ||
          document.monetization.state === 'stopped'
        )
      ) {
        document.monetization.addEventListener(
          'monetizationstart',
          this._monetizationStarted.bind(this),
        );
      } else {
        this.isMonetized = document.monetization.state === 'started';
        if (this.isMonetized) {
          this._enableMonetization();
        }
      }
    }
  }

  private _monetizationStarted() {
    this.isMonetized = true;
    this._enableMonetization();
  }

  private _enableMonetization(): void {
    console.debug('monetization enabled');
  }
}
