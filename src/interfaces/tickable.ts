export interface ITickable {
  tick(t?: number, dt?: number): void;
}
