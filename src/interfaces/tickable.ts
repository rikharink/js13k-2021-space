export interface ITickable<T> {
  tick(t?: number, dt?: number): T;
}
